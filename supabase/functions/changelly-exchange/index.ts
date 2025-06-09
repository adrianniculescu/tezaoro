
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

    // Initialize Supabase client with detailed error handling
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    console.log('🔍 Environment check:')
    console.log('   - SUPABASE_URL exists:', !!supabaseUrl)
    console.log('   - SUPABASE_SERVICE_ROLE_KEY exists:', !!supabaseServiceKey)
    console.log('   - SUPABASE_URL value:', supabaseUrl?.substring(0, 30) + '...')

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

    // Get the base64 encoded API key with detailed vault debugging
    console.log('🔍 Fetching CHANGELLY_API_KEY_BASE64 from vault...')
    let vaultQueryResult
    
    try {
      vaultQueryResult = await supabase
        .from('vault')
        .select('secret')
        .eq('name', 'CHANGELLY_API_KEY_BASE64')
        .maybeSingle()
        
      console.log('🔍 Vault query completed:', {
        hasData: !!vaultQueryResult.data,
        hasError: !!vaultQueryResult.error,
        errorDetails: vaultQueryResult.error
      })
    } catch (vaultQueryError) {
      console.error('❌ Vault query exception:', vaultQueryError)
      return new Response(
        JSON.stringify({ 
          error: 'Database query failed',
          details: vaultQueryError.message,
          debugInfo: { requestId, step: 'vault_query_exception' }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { data: base64KeyData, error: base64KeyError } = vaultQueryResult

    if (base64KeyError) {
      console.error('❌ Vault query error:', base64KeyError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to retrieve API credentials from vault',
          details: base64KeyError.message,
          debugInfo: { 
            requestId, 
            step: 'vault_query_error',
            errorCode: base64KeyError.code,
            errorHint: base64KeyError.hint
          }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!base64KeyData?.secret) {
      console.error('❌ CHANGELLY_API_KEY_BASE64 not found in vault')
      
      // Check if the secret exists with a different name
      try {
        const allSecrets = await supabase.from('vault').select('name').limit(10)
        console.log('🔍 Available secrets in vault:', allSecrets.data?.map(s => s.name) || [])
      } catch (listError) {
        console.log('🔍 Could not list vault secrets:', listError)
      }
      
      return new Response(
        JSON.stringify({ 
          error: 'API credentials not configured',
          details: 'CHANGELLY_API_KEY_BASE64 not found in vault. Please add this secret with your base64 encoded Changelly API keys in format: base64(public_key:private_key)',
          debugInfo: { 
            requestId, 
            step: 'secret_not_found',
            secretExists: !!base64KeyData,
            secretHasValue: !!base64KeyData?.secret
          }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('✅ Found base64 key in vault')
    console.log('🔍 Secret length:', base64KeyData.secret?.length || 0)
    console.log('🔍 Secret starts with:', base64KeyData.secret?.substring(0, 10))
    
    // Decode and parse the base64 key with comprehensive error handling
    let publicKey: string
    let privateKey: string

    try {
      const rawSecret = base64KeyData.secret.trim()
      console.log('🔍 Raw secret length:', rawSecret.length)
      console.log('🔍 Raw secret first 20 chars:', rawSecret.substring(0, 20))
      console.log('🔍 Raw secret contains colon before decode:', rawSecret.includes(':'))
      
      // Check if it's already decoded (contains colon)
      if (rawSecret.includes(':')) {
        console.log('🔍 Secret appears to be already decoded (contains colon)')
        const keyParts = rawSecret.split(':')
        if (keyParts.length !== 2) {
          throw new Error(`Expected exactly 2 key parts separated by colon, got ${keyParts.length}`)
        }
        publicKey = keyParts[0].trim()
        privateKey = keyParts[1].trim()
      } else {
        console.log('🔐 Attempting base64 decode...')
        const decodedKey = atob(rawSecret)
        console.log('✅ Base64 decode successful, length:', decodedKey.length)
        console.log('🔍 Decoded string preview:', decodedKey.substring(0, 50))
        
        if (!decodedKey.includes(':')) {
          throw new Error('Decoded key does not contain colon separator. Expected format after decode: public_key:private_key')
        }
        
        const keyParts = decodedKey.split(':')
        if (keyParts.length !== 2) {
          throw new Error(`Expected exactly 2 key parts after decode, got ${keyParts.length}`)
        }
        
        publicKey = keyParts[0].trim()
        privateKey = keyParts[1].trim()
      }
      
      console.log('✅ Keys parsed successfully')
      console.log('🔑 Public key length:', publicKey.length)
      console.log('🔑 Private key length:', privateKey.length)
      console.log('🔑 Public key preview:', publicKey.substring(0, 8) + '...')
      console.log('🔑 Private key preview:', privateKey.substring(0, 8) + '...')
      
      // Validate key formats
      if (publicKey.length < 8 || privateKey.length < 16) {
        throw new Error(`Keys seem too short - Public: ${publicKey.length} chars, Private: ${privateKey.length} chars`)
      }
      
    } catch (decodeError) {
      console.error('❌ Key decode/parse error:', decodeError)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid API key format',
          details: `${decodeError.message}. Please ensure your CHANGELLY_API_KEY_BASE64 contains either base64(public_key:private_key) or public_key:private_key directly.`,
          debugInfo: { 
            requestId, 
            step: 'key_decode_error',
            secretLength: base64KeyData.secret?.length || 0,
            hasColon: base64KeyData.secret?.includes(':') || false
          }
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

    // Create HMAC-SHA512 signature with detailed error handling
    console.log('🔐 Creating HMAC-SHA512 signature...')
    let signatureHex: string
    
    try {
      const encoder = new TextEncoder()
      const keyData = encoder.encode(privateKey)
      const messageData = encoder.encode(message)
      
      console.log('🔍 Signature creation inputs:')
      console.log('   - Key data length:', keyData.length)
      console.log('   - Message data length:', messageData.length)
      
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
          debugInfo: { 
            requestId, 
            step: 'signature_creation',
            cryptoErrorName: cryptoError.name
          }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Prepare API call with comprehensive logging
    const apiUrl = 'https://api.changelly.com'
    const headers = {
      'Content-Type': 'application/json',
      'api-key': publicKey,
      'sign': signatureHex,
    }

    console.log('🌐 Making API call to Changelly:')
    console.log('   - URL:', apiUrl)
    console.log('   - Method: POST')
    console.log('   - Public Key:', publicKey.substring(0, 8) + '...')
    console.log('   - Signature length:', signatureHex.length)
    console.log('   - Request body:', message)

    // Make the API call with timeout and detailed error handling
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
      console.log('📊 Response ok:', response.ok)
      console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()))
      
    } catch (fetchError) {
      console.error('❌ Network/Fetch error:', fetchError)
      
      let errorType = 'unknown'
      if (fetchError.name === 'AbortError') {
        errorType = 'timeout'
      } else if (fetchError.message?.includes('network')) {
        errorType = 'network'
      } else if (fetchError.message?.includes('CORS')) {
        errorType = 'cors'
      }
      
      return new Response(
        JSON.stringify({ 
          error: 'Network error connecting to Changelly API',
          details: fetchError.message,
          debugInfo: { 
            requestId, 
            step: 'api_fetch_error',
            errorName: fetchError.name,
            errorType,
            totalTime: Date.now() - requestStartTime
          }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Process response with comprehensive logging
    let responseText: string
    try {
      responseText = await response.text()
      console.log('📄 Raw response body length:', responseText.length)
      console.log('📄 Raw response body:', responseText)
    } catch (responseReadError) {
      console.error('❌ Failed to read response body:', responseReadError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to read API response',
          details: responseReadError.message,
          debugInfo: { 
            requestId, 
            step: 'response_read_error',
            status: response.status
          }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Handle non-200 responses with detailed analysis
    if (!response.ok) {
      console.error(`❌ API returned error status: ${response.status} ${response.statusText}`)
      
      let errorAnalysis = {
        status: response.status,
        statusText: response.statusText,
        body: responseText,
        headers: Object.fromEntries(response.headers.entries())
      }
      
      // Provide specific guidance based on status code
      let userFriendlyMessage = ''
      if (response.status === 401) {
        userFriendlyMessage = `Authentication failed. Please verify your Changelly API keys are correct and properly formatted.`
      } else if (response.status === 403) {
        userFriendlyMessage = `Access forbidden. Your API keys may not have the required permissions.`
      } else if (response.status === 400) {
        userFriendlyMessage = `Bad request. The API request format may be incorrect.`
      } else if (response.status === 429) {
        userFriendlyMessage = `Rate limit exceeded. Please wait before making more requests.`
      } else if (response.status >= 500) {
        userFriendlyMessage = `Changelly server error. This is likely temporary.`
      } else {
        userFriendlyMessage = `Unexpected API response status: ${response.status}`
      }
      
      return new Response(
        JSON.stringify({
          error: userFriendlyMessage,
          details: responseText,
          debugInfo: {
            requestId,
            step: 'api_error_response',
            errorAnalysis,
            totalTime: Date.now() - requestStartTime,
            requestSent: {
              url: apiUrl,
              method: 'POST',
              body: message,
              publicKeyPreview: publicKey.substring(0, 8) + '...',
              signatureLength: signatureHex.length
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
      console.log('📋 Response keys:', Object.keys(responseData))
      console.log('📋 Has result:', !!responseData.result)
      console.log('📋 Has error:', !!responseData.error)
    } catch (parseError) {
      console.error('❌ Response parse error:', parseError)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON response from Changelly API',
          details: 'The API returned a response that could not be parsed as JSON',
          rawResponse: responseText.substring(0, 500),
          debugInfo: { 
            requestId, 
            step: 'response_parse_error',
            parseErrorMessage: parseError.message
          }
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
          debugInfo: { 
            requestId, 
            step: 'api_error_in_response',
            fullError: responseData.error,
            totalTime: Date.now() - requestStartTime
          }
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const totalTime = Date.now() - requestStartTime
    console.log(`🎉 SUCCESS! Request completed in ${totalTime}ms`)
    console.log('📊 Final result type:', typeof responseData.result)
    console.log('📊 Result preview:', JSON.stringify(responseData.result).substring(0, 100))
    console.log('=== CHANGELLY DEBUG SESSION END ===')

    return new Response(
      JSON.stringify({
        ...responseData,
        debugInfo: {
          requestId,
          totalTime,
          step: 'success',
          publicKeyLength: publicKey.length,
          privateKeyLength: privateKey.length,
          signatureLength: signatureHex.length
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
        stack: error.stack?.substring(0, 1000),
        debugInfo: {
          step: 'top_level_exception',
          errorName: error.name
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
