
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('=== Changelly Edge Function Started ===')
    console.log('Request method:', req.method)
    console.log('Request URL:', req.url)
    console.log('Timestamp:', new Date().toISOString())

    // Validate request method
    if (req.method !== 'POST') {
      console.error('Invalid request method:', req.method)
      return new Response(
        JSON.stringify({ error: 'Method not allowed. Use POST.' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body
    let requestBody
    try {
      requestBody = await req.json()
      console.log('Request body received:', JSON.stringify(requestBody, null, 2))
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError)
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const { action, ...params } = requestBody

    if (!action) {
      console.error('Missing action parameter')
      return new Response(
        JSON.stringify({ error: 'Missing action parameter' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Action requested:', action)
    console.log('Parameters:', JSON.stringify(params, null, 2))

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    console.log('Supabase client initialized')

    // Get API credentials from vault
    console.log('🔍 Fetching Changelly API keys from vault...')

    const { data: publicKeyData, error: publicKeyError } = await supabase
      .from('vault')
      .select('secret')
      .eq('name', 'CHANGELLY_PUBLIC_KEY')
      .maybeSingle()

    const { data: privateKeyData, error: privateKeyError } = await supabase
      .from('vault')
      .select('secret')
      .eq('name', 'CHANGELLY_PRIVATE_KEY')
      .maybeSingle()

    if (publicKeyError || privateKeyError) {
      console.error('❌ Failed to fetch API keys:', { publicKeyError, privateKeyError })
      return new Response(
        JSON.stringify({ 
          error: 'Failed to retrieve API credentials',
          details: 'Could not find CHANGELLY_PUBLIC_KEY and CHANGELLY_PRIVATE_KEY in vault.'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (!publicKeyData?.secret || !privateKeyData?.secret) {
      console.error('❌ API keys not found in vault')
      return new Response(
        JSON.stringify({ 
          error: 'API credentials not configured',
          details: 'Please set both CHANGELLY_PUBLIC_KEY and CHANGELLY_PRIVATE_KEY in the Supabase vault'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const publicKey = publicKeyData.secret.trim()
    const privateKey = privateKeyData.secret.trim()

    console.log('✅ Successfully retrieved API keys')
    console.log('🔍 Public key length:', publicKey.length)
    console.log('🔍 Private key length:', privateKey.length)

    // Validate credentials exist and are not empty
    if (!publicKey || !privateKey || publicKey.length === 0 || privateKey.length === 0) {
      console.error('❌ API credentials are null or empty')
      return new Response(
        JSON.stringify({ 
          error: 'API credentials are empty',
          details: 'The API keys are empty. Please ensure your Changelly API keys are properly set and not empty'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create request for Changelly API
    const requestId = crypto.randomUUID()
    const changellyRequest = {
      id: requestId,
      jsonrpc: "2.0",
      method: action,
      params: action === 'getCurrencies' ? {} : params
    }

    const message = JSON.stringify(changellyRequest)
    console.log('📤 Changelly API request:', message)

    // Create X-Api-Key: SHA256 hash of public key in Base64 format
    console.log('🔐 Creating X-Api-Key (SHA256 of public key)...')
    const encoder = new TextEncoder()
    const publicKeyBytes = encoder.encode(publicKey)
    const publicKeyHash = await crypto.subtle.digest('SHA-256', publicKeyBytes)
    const xApiKey = btoa(String.fromCharCode(...new Uint8Array(publicKeyHash)))
    console.log('✅ X-Api-Key created:', xApiKey.substring(0, 20) + '...')

    // Create RSA-SHA256 signature
    console.log('🔐 Creating RSA-SHA256 signature...')
    try {
      // Convert hex private key to binary
      const privateKeyHex = privateKey.replace(/\s/g, '')
      console.log('🔍 Private key hex length:', privateKeyHex.length)
      
      // Convert hex string to Uint8Array
      const privateKeyBytes = new Uint8Array(privateKeyHex.length / 2)
      for (let i = 0; i < privateKeyHex.length; i += 2) {
        privateKeyBytes[i / 2] = parseInt(privateKeyHex.substr(i, 2), 16)
      }
      console.log('✅ Private key converted from hex, bytes length:', privateKeyBytes.length)

      // Import RSA private key
      const rsaPrivateKey = await crypto.subtle.importKey(
        'pkcs8',
        privateKeyBytes,
        {
          name: 'RSA-PSS',
          hash: 'SHA-256'
        },
        false,
        ['sign']
      )
      console.log('✅ RSA private key imported successfully')

      // Sign the message
      const messageBytes = encoder.encode(message)
      const signature = await crypto.subtle.sign(
        {
          name: 'RSA-PSS',
          saltLength: 32
        },
        rsaPrivateKey,
        messageBytes
      )
      
      const xApiSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
      console.log('✅ RSA-SHA256 signature created, length:', xApiSignature.length)
      console.log('🔐 Signature preview:', xApiSignature.substring(0, 20) + '...')

      // Make request to Changelly API
      const apiUrl = 'https://api.changelly.com/v2'
      console.log('🌐 Using API endpoint:', apiUrl)

      const changellyHeaders = {
        'Content-Type': 'application/json',
        'X-Api-Key': xApiKey,
        'X-Api-Signature': xApiSignature,
      }

      console.log('📡 Making request to Changelly API...')
      console.log('🔍 Request headers (sanitized):', {
        'Content-Type': 'application/json',
        'X-Api-Key': xApiKey.substring(0, 12) + '...' + xApiKey.substring(xApiKey.length - 4),
        'X-Api-Signature': xApiSignature.substring(0, 16) + '...'
      })

      let changellyResponse
      try {
        changellyResponse = await fetch(apiUrl, {
          method: 'POST',
          headers: changellyHeaders,
          body: message
        })
        console.log('📥 Changelly API response received')
        console.log('📥 Status:', changellyResponse.status)
        console.log('📥 Status Text:', changellyResponse.statusText)
      } catch (fetchError) {
        console.error('❌ Network error calling Changelly API:', fetchError)
        return new Response(
          JSON.stringify({ 
            error: 'Network error connecting to Changelly API',
            details: fetchError.message
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      const responseText = await changellyResponse.text()
      console.log('📄 Changelly API response body:', responseText)

      if (!changellyResponse.ok) {
        console.error('❌ Changelly API error response:', {
          status: changellyResponse.status,
          statusText: changellyResponse.statusText,
          body: responseText
        })
        
        if (changellyResponse.status === 401) {
          return new Response(
            JSON.stringify({
              error: 'Invalid Changelly API credentials',
              details: `Authentication failed with Changelly API (401 Unauthorized). 

TROUBLESHOOTING STEPS:

1. **Verify API Key Format**: 
   - Public key should be in standard format
   - Private key should be in hexadecimal format (as provided by Changelly)

2. **Check Key Validity**:
   - Ensure your Changelly API keys are active
   - Verify your account status in Changelly dashboard

3. **Key Storage**:
   - Make sure CHANGELLY_PUBLIC_KEY contains your public key
   - Make sure CHANGELLY_PRIVATE_KEY contains your private key in hex format

Current API endpoint: ${apiUrl}
X-Api-Key (SHA256 hash): ${xApiKey.substring(0, 20)}...
Signature method: RSA-SHA256

If issues persist, verify your API keys in the Changelly dashboard.`,
              status: changellyResponse.status,
              endpoint: apiUrl
            }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }
        
        return new Response(
          JSON.stringify({
            error: `Changelly API error: ${changellyResponse.status}`,
            details: responseText || changellyResponse.statusText,
            status: changellyResponse.status,
            endpoint: apiUrl
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Parse response
      let responseData
      try {
        responseData = JSON.parse(responseText)
        console.log('📋 Parsed Changelly response:', JSON.stringify(responseData, null, 2))
      } catch (parseError) {
        console.error('❌ Failed to parse Changelly response:', parseError)
        return new Response(
          JSON.stringify({ 
            error: 'Invalid response from Changelly API',
            details: responseText
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Check for API-level errors
      if (responseData.error) {
        console.error('❌ Changelly API returned error:', responseData.error)
        return new Response(
          JSON.stringify({
            error: 'Changelly API error',
            details: responseData.error.message || responseData.error,
            code: responseData.error.code
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      console.log('🎉 Changelly API request completed successfully')

      return new Response(
        JSON.stringify(responseData),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )

    } catch (cryptoError) {
      console.error('❌ Cryptographic operation failed:', cryptoError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create request signature',
          details: `Cryptographic error: ${cryptoError.message}. Please verify your private key is in correct hexadecimal format.`
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

  } catch (error) {
    console.error('💥 Edge Function Error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
