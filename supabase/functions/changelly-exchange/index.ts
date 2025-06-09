
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
    const requestStartTime = Date.now()
    const requestId = crypto.randomUUID()
    console.log('=== CHANGELLY DEBUG SESSION START ===')
    console.log('🆔 Request ID:', requestId)
    console.log('⏰ Timestamp:', new Date().toISOString())
    
    // Validate request method
    if (req.method !== 'POST') {
      console.error('❌ Invalid method:', req.method)
      return new Response(
        JSON.stringify({ error: 'Method not allowed. Use POST.' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request body
    let requestBody
    try {
      requestBody = await req.json()
      console.log('✅ Request body parsed:', JSON.stringify(requestBody, null, 2))
    } catch (parseError) {
      console.error('❌ Request body parse error:', parseError)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON in request body',
          details: parseError.message,
          debugInfo: { requestId, step: 'request_parsing' }
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { action, ...params } = requestBody
    if (!action) {
      console.error('❌ Missing action parameter')
      return new Response(
        JSON.stringify({ 
          error: 'Missing action parameter',
          debugInfo: { requestId, step: 'action_validation' }
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('🎯 Action requested:', action)
    console.log('📋 Parameters:', JSON.stringify(params, null, 2))

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    console.log('🔍 Environment check:')
    console.log('   - SUPABASE_URL exists:', !!supabaseUrl)
    console.log('   - SUPABASE_SERVICE_ROLE_KEY exists:', !!supabaseServiceKey)

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing Supabase environment variables')
      return new Response(
        JSON.stringify({ 
          error: 'Server configuration error - Missing Supabase credentials',
          debugInfo: { 
            requestId, 
            step: 'supabase_env_check',
            hasUrl: !!supabaseUrl,
            hasKey: !!supabaseServiceKey
          }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let supabase
    try {
      supabase = createClient(supabaseUrl, supabaseServiceKey)
      console.log('✅ Supabase client initialized successfully')
    } catch (supabaseInitError) {
      console.error('❌ Supabase client initialization failed:', supabaseInitError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to initialize Supabase client',
          details: supabaseInitError.message,
          debugInfo: { requestId, step: 'supabase_init' }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Try multiple approaches to get API keys
    let publicKey: string | null = null
    let privateKey: string | null = null

    // First, try to get the base64 encoded key from vault
    console.log('🔍 Attempting to fetch CHANGELLY_API_KEY_BASE64 from vault...')
    const { data: base64KeyData, error: base64KeyError } = await supabase
      .from('vault')
      .select('secret')
      .eq('name', 'CHANGELLY_API_KEY_BASE64')
      .maybeSingle()

    if (base64KeyData?.secret && !base64KeyError) {
      console.log('✅ Found CHANGELLY_API_KEY_BASE64 in vault')
      try {
        const decodedKeys = atob(base64KeyData.secret.trim())
        const keyParts = decodedKeys.split(':')
        
        if (keyParts.length === 2) {
          publicKey = keyParts[0].trim()
          privateKey = keyParts[1].trim()
          console.log('✅ Successfully decoded base64 API keys')
        } else {
          console.warn('⚠️ Invalid base64 key format, trying individual keys...')
        }
      } catch (decodeError) {
        console.warn('⚠️ Failed to decode base64 key:', decodeError.message)
      }
    } else {
      console.log('⚠️ CHANGELLY_API_KEY_BASE64 not found or error:', base64KeyError?.message)
    }

    // If base64 approach failed, try individual keys from Deno environment
    if (!publicKey || !privateKey) {
      console.log('🔍 Trying to get individual API keys from environment...')
      
      // Check if keys are available as direct environment variables
      const envPublicKey = Deno.env.get('CHANGELLY_PUBLIC_KEY')
      const envPrivateKey = Deno.env.get('CHANGELLY_PRIVATE_KEY')
      
      if (envPublicKey && envPrivateKey) {
        publicKey = envPublicKey.trim()
        privateKey = envPrivateKey.trim()
        console.log('✅ Found individual API keys in environment')
      } else {
        console.log('⚠️ Individual keys not found in environment')
        
        // Try to get individual keys from vault as fallback
        console.log('🔍 Trying individual keys from vault...')
        
        const [publicKeyResult, privateKeyResult] = await Promise.all([
          supabase.from('vault').select('secret').eq('name', 'CHANGELLY_PUBLIC_KEY').maybeSingle(),
          supabase.from('vault').select('secret').eq('name', 'CHANGELLY_PRIVATE_KEY').maybeSingle()
        ])
        
        if (publicKeyResult.data?.secret && privateKeyResult.data?.secret) {
          publicKey = publicKeyResult.data.secret.trim()
          privateKey = privateKeyResult.data.secret.trim()
          console.log('✅ Found individual API keys in vault')
        }
      }
    }

    // Final validation
    if (!publicKey || !privateKey) {
      console.error('❌ No valid Changelly API keys found')
      return new Response(
        JSON.stringify({ 
          error: 'Changelly API keys not configured',
          details: 'Please add CHANGELLY_API_KEY_BASE64 (base64 encoded "public:private") or individual CHANGELLY_PUBLIC_KEY and CHANGELLY_PRIVATE_KEY to Supabase secrets',
          debugInfo: { 
            requestId, 
            step: 'api_keys_not_found',
            attempted: ['CHANGELLY_API_KEY_BASE64', 'individual_env_keys', 'individual_vault_keys']
          }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('🔑 API keys validated:')
    console.log('   - Public key length:', publicKey.length)
    console.log('   - Private key length:', privateKey.length)
    console.log('   - Public key preview:', publicKey.substring(0, 8) + '...')

    // Validate key formats
    if (publicKey.length < 8 || privateKey.length < 16) {
      console.error('❌ Keys seem too short')
      return new Response(
        JSON.stringify({ 
          error: 'Invalid API key format',
          details: `Keys seem too short - Public: ${publicKey.length} chars, Private: ${privateKey.length} chars`,
          debugInfo: { requestId, step: 'key_validation_error' }
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Changelly API request
    const changellyRequest = {
      id: requestId,
      jsonrpc: "2.0",
      method: action,
      params: action === 'getCurrencies' ? {} : params
    }

    const message = JSON.stringify(changellyRequest)
    console.log('📝 Changelly request message:', message)

    // Create HMAC-SHA512 signature
    console.log('🔐 Creating HMAC-SHA512 signature...')
    let signatureHex: string
    
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
      signatureHex = Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
      
      console.log('✅ HMAC-SHA512 signature created successfully')
      console.log('🔐 Signature length:', signatureHex.length)
      console.log('🔐 Signature preview:', signatureHex.substring(0, 16) + '...')
      
    } catch (cryptoError) {
      console.error('❌ Signature creation error:', cryptoError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create request signature',
          details: cryptoError.message,
          debugInfo: { requestId, step: 'signature_creation' }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Use the correct Changelly API endpoint
    const apiUrl = 'https://api.changelly.com/v2'
    const headers = {
      'Content-Type': 'application/json',
      'X-Api-Key': publicKey,
      'X-Api-Signature': signatureHex,
    }

    console.log('🌐 Making API call to Changelly:')
    console.log('   - URL:', apiUrl)
    console.log('   - Method: POST')
    console.log('   - Content-Type:', headers['Content-Type'])
    console.log('   - X-Api-Key:', publicKey.substring(0, 8) + '...' + publicKey.substring(publicKey.length - 4))
    console.log('   - X-Api-Signature length:', signatureHex.length)
    console.log('   - Request body length:', message.length)

    // Make the API call
    console.log('📡 Sending request to Changelly API...')
    let response: Response
    
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        console.log('⏰ Request timeout after 30 seconds')
        controller.abort()
      }, 30000)
      
      const fetchStartTime = Date.now()
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: message,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      const fetchTime = Date.now() - fetchStartTime
      console.log(`📥 API response received in ${fetchTime}ms`)
      console.log('📊 Response status:', response.status)
      console.log('📊 Response status text:', response.statusText)
      console.log('📊 Response ok:', response.ok)
      console.log('📊 Response headers:', JSON.stringify(Object.fromEntries(response.headers.entries())))
      
    } catch (fetchError) {
      console.error('❌ Network/Fetch error:', fetchError)
      return new Response(
        JSON.stringify({ 
          error: 'Network error connecting to Changelly API',
          details: fetchError.message,
          debugInfo: { 
            requestId, 
            step: 'api_fetch_error',
            errorName: fetchError.name
          }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Process response
    let responseText: string
    try {
      responseText = await response.text()
      console.log('📄 Raw response body length:', responseText.length)
      console.log('📄 Raw response body preview:', responseText.substring(0, 500))
      if (responseText.length > 500) {
        console.log('📄 Response body truncated... (total length:', responseText.length, ')')
      }
    } catch (responseReadError) {
      console.error('❌ Failed to read response body:', responseReadError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to read API response',
          details: responseReadError.message,
          debugInfo: { requestId, step: 'response_read_error' }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Handle non-200 responses with detailed analysis
    if (!response.ok) {
      console.error(`❌ API returned error status: ${response.status} ${response.statusText}`)
      console.error('❌ Full error response body:', responseText)
      
      let userFriendlyMessage = ''
      let detailedError = responseText
      
      // Try to parse the error response for more details
      try {
        const errorData = JSON.parse(responseText)
        if (errorData.error) {
          detailedError = JSON.stringify(errorData.error, null, 2)
          if (errorData.error.message) {
            detailedError = errorData.error.message
          }
        }
      } catch (parseError) {
        console.log('⚠️ Could not parse error response as JSON')
      }
      
      if (response.status === 401) {
        userFriendlyMessage = `Authentication failed. Please verify your Changelly API keys are correct and active.`
      } else if (response.status === 403) {
        userFriendlyMessage = `Access forbidden. Your API keys may not have the required permissions for this operation.`
      } else if (response.status === 400) {
        userFriendlyMessage = `Bad request. The API request format may be incorrect or missing required parameters.`
      } else if (response.status === 429) {
        userFriendlyMessage = `Rate limit exceeded. Please wait before making more requests.`
      } else if (response.status >= 500) {
        userFriendlyMessage = `Changelly server error (${response.status}). This is likely temporary.`
      } else {
        userFriendlyMessage = `Unexpected API response status: ${response.status} ${response.statusText}`
      }
      
      return new Response(
        JSON.stringify({
          error: userFriendlyMessage,
          details: detailedError,
          debugInfo: {
            requestId,
            step: 'api_error_response',
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            requestSent: {
              url: apiUrl,
              method: 'POST',
              headers: {
                'Content-Type': headers['Content-Type'],
                'X-Api-Key': headers['X-Api-Key'].substring(0, 8) + '...',
                'X-Api-Signature': headers['X-Api-Signature'].substring(0, 16) + '...'
              },
              bodyLength: message.length
            }
          }
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse successful response
    let responseData
    try {
      responseData = JSON.parse(responseText)
      console.log('✅ Response parsed successfully')
      console.log('📋 Response structure:', {
        hasId: !!responseData.id,
        hasJsonrpc: !!responseData.jsonrpc,
        hasResult: !!responseData.result,
        hasError: !!responseData.error,
        resultType: typeof responseData.result,
        resultLength: Array.isArray(responseData.result) ? responseData.result.length : 'not array'
      })
    } catch (parseError) {
      console.error('❌ Response parse error:', parseError)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON response from Changelly API',
          details: 'The API returned a response that could not be parsed as JSON',
          rawResponse: responseText.substring(0, 500),
          debugInfo: { requestId, step: 'response_parse_error' }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check for API-level errors in the response
    if (responseData.error) {
      console.error('❌ Changelly API error in response:', responseData.error)
      return new Response(
        JSON.stringify({
          error: 'Changelly API returned an error',
          details: responseData.error.message || JSON.stringify(responseData.error),
          code: responseData.error.code,
          debugInfo: { requestId, step: 'api_error_in_response' }
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const totalTime = Date.now() - requestStartTime
    console.log(`🎉 SUCCESS! Request completed in ${totalTime}ms`)
    console.log('=== CHANGELLY DEBUG SESSION END ===')

    return new Response(
      JSON.stringify({
        ...responseData,
        debugInfo: {
          requestId,
          totalTime,
          step: 'success'
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('💥 Unexpected top-level error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        debugInfo: { step: 'top_level_exception' }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
