
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

    // Get API credentials from vault - trying the base64 key first
    console.log('🔍 Fetching Changelly API credentials from vault...')

    const { data: secretsData, error: secretsError } = await supabase
      .from('vault')
      .select('name, secret, updated_at, created_at')
      .in('name', ['CHANGELLY_PUBLIC_KEY', 'CHANGELLY_PRIVATE_KEY', 'CHANGELLY_API_KEY_BASE64'])
      .order('updated_at', { ascending: false })

    if (secretsError) {
      console.error('❌ Failed to fetch secrets from vault:', secretsError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to retrieve API credentials',
          details: secretsError.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('📊 All secrets found:', secretsData?.length || 0)
    console.log('🔍 Secret names available:', secretsData?.map(s => s.name) || [])

    if (!secretsData || secretsData.length === 0) {
      console.error('❌ No API credentials found in vault')
      return new Response(
        JSON.stringify({ 
          error: 'API credentials not configured',
          details: 'Please ensure Changelly API keys are set in the Supabase vault'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Try to use CHANGELLY_API_KEY_BASE64 first, then fall back to individual keys
    const base64KeyRecord = secretsData.find(s => s.name === 'CHANGELLY_API_KEY_BASE64')
    const publicKeyRecord = secretsData.find(s => s.name === 'CHANGELLY_PUBLIC_KEY')
    const privateKeyRecord = secretsData.find(s => s.name === 'CHANGELLY_PRIVATE_KEY')

    let publicKey, privateKey

    if (base64KeyRecord && base64KeyRecord.secret) {
      console.log('✅ Found CHANGELLY_API_KEY_BASE64, attempting to decode...')
      try {
        const decodedKeys = atob(base64KeyRecord.secret.trim())
        const keyParts = decodedKeys.split(':')
        if (keyParts.length >= 2) {
          publicKey = keyParts[0].trim()
          privateKey = keyParts[1].trim()
          console.log('✅ Successfully decoded base64 API keys')
        } else {
          console.warn('⚠️ Base64 key format invalid, falling back to individual keys')
        }
      } catch (decodeError) {
        console.warn('⚠️ Failed to decode base64 key, falling back to individual keys:', decodeError)
      }
    }

    // If base64 didn't work, try individual keys
    if (!publicKey || !privateKey) {
      if (publicKeyRecord && privateKeyRecord) {
        console.log('✅ Using individual CHANGELLY_PUBLIC_KEY and CHANGELLY_PRIVATE_KEY')
        publicKey = publicKeyRecord.secret?.trim()
        privateKey = privateKeyRecord.secret?.trim()
      } else {
        const missingKeys = []
        if (!base64KeyRecord) missingKeys.push('CHANGELLY_API_KEY_BASE64')
        if (!publicKeyRecord) missingKeys.push('CHANGELLY_PUBLIC_KEY')
        if (!privateKeyRecord) missingKeys.push('CHANGELLY_PRIVATE_KEY')
        
        console.error('❌ Missing required API keys:', missingKeys)
        return new Response(
          JSON.stringify({ 
            error: 'Incomplete API credentials',
            details: 'Please set either CHANGELLY_API_KEY_BASE64 or both CHANGELLY_PUBLIC_KEY and CHANGELLY_PRIVATE_KEY in the vault',
            available_keys: secretsData?.map(s => s.name) || [],
            missing_keys: missingKeys
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
    }

    console.log('✅ API credentials retrieved successfully')
    console.log('🔍 Public key length:', publicKey?.length || 0)
    console.log('🔍 Private key length:', privateKey?.length || 0)

    // Validate credentials exist and are not empty
    if (!publicKey || !privateKey || publicKey.length === 0 || privateKey.length === 0) {
      console.error('❌ API credentials are null or empty')
      return new Response(
        JSON.stringify({ 
          error: 'API credentials are empty',
          details: 'Please ensure your Changelly API keys are properly set in the vault and not empty'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate minimum key lengths (Changelly keys should be longer)
    if (publicKey.length < 20 || privateKey.length < 20) {
      console.error('❌ API keys appear too short for Changelly API')
      console.error('🔍 Public key length:', publicKey.length)
      console.error('🔍 Private key length:', privateKey.length)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid API key format',
          details: `API keys appear too short. Public: ${publicKey.length} chars, Private: ${privateKey.length} chars. Please verify your Changelly API keys.`
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('✅ API key validation passed')

    // Create request for Changelly API
    const requestId = crypto.randomUUID()
    const changellyRequest = {
      id: requestId,
      jsonrpc: "2.0",
      method: action,
      params
    }

    const message = JSON.stringify(changellyRequest)
    console.log('📤 Changelly API request:', message)

    // Create HMAC signature
    const encoder = new TextEncoder()
    const keyData = encoder.encode(privateKey)
    const messageData = encoder.encode(message)
    
    console.log('🔐 Creating HMAC signature...')
    
    let cryptoKey
    try {
      cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-512' },
        false,
        ['sign']
      )
      console.log('✅ Crypto key imported successfully')
    } catch (keyError) {
      console.error('❌ Failed to import crypto key:', keyError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to process API credentials',
          details: 'Error creating signature key'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    let signature
    try {
      signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData)
      console.log('✅ HMAC signature created successfully')
    } catch (signError) {
      console.error('❌ Failed to create signature:', signError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create request signature',
          details: 'Error signing request'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    const signatureHex = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    console.log('🔐 HMAC signature created with length:', signatureHex.length)

    // Make request to Changelly API
    const changellyHeaders = {
      'Content-Type': 'application/json',
      'X-Api-Key': publicKey,
      'X-Api-Signature': signatureHex,
    }

    console.log('📡 Making request to Changelly API...')

    let changellyResponse
    try {
      changellyResponse = await fetch('https://api.changelly.com/v2', {
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
      
      // Provide specific error messages based on status code
      if (changellyResponse.status === 401) {
        console.error('🔍 401 Unauthorized Analysis:')
        console.error('  - This indicates invalid API credentials')
        console.error('  - Please verify your keys are correct and active')
        console.error('  - Check that your Changelly account has the required permissions')
        
        return new Response(
          JSON.stringify({ 
            error: 'Invalid Changelly API credentials',
            details: 'The Changelly API rejected your credentials. Please verify:\n1. Your API keys are correct and copied completely\n2. Your API keys are active and not expired\n3. Your Changelly account has the necessary permissions\n4. You have enabled the required API methods in your Changelly dashboard',
            status: changellyResponse.status,
            response_body: responseText
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
          request: action,
          status: changellyResponse.status
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

  } catch (error) {
    console.error('💥 Edge Function Error')
    console.error('Error name:', error.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    
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
