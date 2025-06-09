
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

    // Try to get the base64 key first, then fall back to individual keys
    console.log('🔍 Checking for CHANGELLY_API_KEY_BASE64...')
    const { data: base64KeyData, error: base64KeyError } = await supabase
      .from('vault')
      .select('secret')
      .eq('name', 'CHANGELLY_API_KEY_BASE64')
      .maybeSingle()

    let publicKey: string
    let privateKey: string

    if (base64KeyData?.secret && !base64KeyError) {
      console.log('✅ Found base64 encoded key, decoding...')
      try {
        const decodedKey = atob(base64KeyData.secret.trim())
        const [pubKey, privKey] = decodedKey.split(':')
        
        if (!pubKey || !privKey) {
          throw new Error('Base64 key must contain public:private format')
        }
        
        publicKey = pubKey.trim()
        privateKey = privKey.trim()
        console.log('✅ Successfully decoded base64 key')
        console.log('🔍 Public key length:', publicKey.length)
        console.log('🔍 Private key length:', privateKey.length)
      } catch (decodeError) {
        console.error('❌ Failed to decode base64 key:', decodeError)
        return new Response(
          JSON.stringify({ 
            error: 'Invalid base64 key format',
            details: 'Base64 key must be in format: base64(public_key:private_key)'
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
    } else {
      console.log('🔍 Base64 key not found, checking individual keys...')
      
      // Get individual API credentials from vault
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
        console.error('❌ Failed to fetch individual API keys:', { publicKeyError, privateKeyError })
        return new Response(
          JSON.stringify({ 
            error: 'Failed to retrieve API credentials',
            details: 'Could not find CHANGELLY_API_KEY_BASE64 or individual CHANGELLY_PUBLIC_KEY and CHANGELLY_PRIVATE_KEY in vault.'
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      if (!publicKeyData?.secret || !privateKeyData?.secret) {
        console.error('❌ Individual API keys not found in vault')
        return new Response(
          JSON.stringify({ 
            error: 'API credentials not configured',
            details: 'Please set either CHANGELLY_API_KEY_BASE64 or both CHANGELLY_PUBLIC_KEY and CHANGELLY_PRIVATE_KEY in the Supabase vault'
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      publicKey = publicKeyData.secret.trim()
      privateKey = privateKeyData.secret.trim()
      console.log('✅ Successfully retrieved individual API keys')
      console.log('🔍 Public key length:', publicKey.length)
      console.log('🔍 Private key length:', privateKey.length)
    }

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

    // Create HMAC-SHA512 signature (Changelly v1 style)
    console.log('🔐 Creating HMAC-SHA512 signature...')
    try {
      const encoder = new TextEncoder()
      const keyData = encoder.encode(privateKey)
      const messageData = encoder.encode(message)
      
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-512' },
        false,
        ['sign']
      )
      
      const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData)
      const signatureHex = Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
      
      console.log('✅ HMAC-SHA512 signature created, length:', signatureHex.length)
      console.log('🔐 Signature preview:', signatureHex.substring(0, 20) + '...')

      // Make request to Changelly API using v1 endpoint
      const apiUrl = 'https://api.changelly.com'
      console.log('🌐 Using API endpoint:', apiUrl)

      const changellyHeaders = {
        'Content-Type': 'application/json',
        'api-key': publicKey,
        'sign': signatureHex,
      }

      console.log('📡 Making request to Changelly API...')
      console.log('🔍 Request headers (sanitized):', {
        'Content-Type': 'application/json',
        'api-key': publicKey.substring(0, 8) + '...' + publicKey.substring(publicKey.length - 4),
        'sign': signatureHex.substring(0, 16) + '...'
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

1. **Check Key Format**: 
   - Using HMAC-SHA512 authentication (v1 API)
   - Public key: Should be your Changelly public API key
   - Private key: Should be your Changelly private API key (plain text)

2. **Verify Keys in Changelly Dashboard**:
   - Log into your Changelly account
   - Go to API settings
   - Ensure keys are active and correctly copied

3. **Current Configuration**:
   - API endpoint: ${apiUrl}
   - Public key length: ${publicKey.length} chars
   - Private key length: ${privateKey.length} chars

Response from Changelly: ${responseText}`,
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
          details: `Cryptographic error: ${cryptoError.message}. 

Please verify your private key format. For HMAC-SHA512, use the plain text private key from Changelly.

Current private key length: ${privateKey?.length || 0} characters`
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
