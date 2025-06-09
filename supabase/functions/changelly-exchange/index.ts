
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
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { action, ...params } = requestBody
    if (!action) {
      console.error('❌ Missing action parameter')
      return new Response(
        JSON.stringify({ error: 'Missing action parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('🎯 Action requested:', action)
    console.log('📋 Parameters:', JSON.stringify(params, null, 2))

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing Supabase environment variables')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    console.log('✅ Supabase client initialized')

    // Get the base64 encoded API key
    console.log('🔍 Fetching CHANGELLY_API_KEY_BASE64 from vault...')
    const { data: base64KeyData, error: base64KeyError } = await supabase
      .from('vault')
      .select('secret')
      .eq('name', 'CHANGELLY_API_KEY_BASE64')
      .maybeSingle()

    console.log('🔍 Vault query result:', { 
      hasData: !!base64KeyData, 
      hasError: !!base64KeyError,
      errorDetails: base64KeyError
    })

    if (base64KeyError) {
      console.error('❌ Vault query error:', base64KeyError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to retrieve API credentials',
          details: base64KeyError
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!base64KeyData?.secret) {
      console.error('❌ CHANGELLY_API_KEY_BASE64 not found in vault')
      return new Response(
        JSON.stringify({ 
          error: 'API credentials not configured',
          details: 'CHANGELLY_API_KEY_BASE64 not found. Please set this secret with your base64 encoded Changelly API keys.'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('✅ Found base64 key in vault')
    console.log('🔍 Secret length:', base64KeyData.secret?.length || 0)
    
    // Decode and parse the base64 key
    let publicKey: string
    let privateKey: string

    try {
      const rawSecret = base64KeyData.secret.trim()
      console.log('🔍 Raw secret (first 20 chars):', rawSecret.substring(0, 20))
      console.log('🔍 Raw secret (last 20 chars):', rawSecret.substring(rawSecret.length - 20))
      
      console.log('🔐 Attempting base64 decode...')
      const decodedKey = atob(rawSecret)
      console.log('✅ Base64 decode successful')
      console.log('🔍 Decoded length:', decodedKey.length)
      
      // Check if the decoded string contains a colon
      if (!decodedKey.includes(':')) {
        throw new Error('Decoded key does not contain colon separator. Expected format: public_key:private_key')
      }
      
      const keyParts = decodedKey.split(':')
      console.log('🔍 Key parts count:', keyParts.length)
      
      if (keyParts.length !== 2) {
        throw new Error(`Expected exactly 2 key parts, got ${keyParts.length}`)
      }
      
      publicKey = keyParts[0].trim()
      privateKey = keyParts[1].trim()
      
      console.log('✅ Keys parsed successfully')
      console.log('🔑 Public key length:', publicKey.length)
      console.log('🔑 Private key length:', privateKey.length)
      console.log('🔑 Public key sample:', publicKey.substring(0, 8) + '...' + publicKey.substring(publicKey.length - 4))
      console.log('🔑 Private key sample:', privateKey.substring(0, 8) + '...' + privateKey.substring(privateKey.length - 4))
      
      // Validate key lengths (typical Changelly key lengths)
      if (publicKey.length < 20 || privateKey.length < 40) {
        console.warn('⚠️ Warning: Key lengths seem short')
        console.warn('⚠️ Public key length:', publicKey.length, '(expected ~32)')
        console.warn('⚠️ Private key length:', privateKey.length, '(expected ~64)')
      }
      
    } catch (decodeError) {
      console.error('❌ Key decode/parse error:', decodeError)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid base64 key format',
          details: `${decodeError.message}. Please ensure your CHANGELLY_API_KEY_BASE64 contains base64(public_key:private_key).`,
          debugInfo: { requestId, errorMessage: decodeError.message }
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
    console.log('📏 Message length:', message.length)

    // Create HMAC-SHA512 signature
    console.log('🔐 Creating HMAC-SHA512 signature...')
    let signatureHex: string
    
    try {
      const encoder = new TextEncoder()
      const keyData = encoder.encode(privateKey)
      const messageData = encoder.encode(message)
      
      console.log('🔍 Signature inputs:')
      console.log('   - Key data length:', keyData.length)
      console.log('   - Message data length:', messageData.length)
      console.log('   - Message preview:', message.substring(0, 100))
      
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
      
      console.log('✅ HMAC-SHA512 signature created')
      console.log('🔐 Signature length:', signatureHex.length)
      console.log('🔐 Signature sample:', signatureHex.substring(0, 16) + '...' + signatureHex.substring(signatureHex.length - 8))
      
    } catch (cryptoError) {
      console.error('❌ Signature creation error:', cryptoError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create request signature',
          details: cryptoError.message,
          debugInfo: { requestId, cryptoErrorName: cryptoError.name }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Prepare API call
    const apiUrl = 'https://api.changelly.com'
    const headers = {
      'Content-Type': 'application/json',
      'api-key': publicKey,
      'sign': signatureHex,
    }

    console.log('🌐 API Call Details:')
    console.log('   - URL:', apiUrl)
    console.log('   - Method: POST')
    console.log('   - Headers (sanitized):', {
      'Content-Type': 'application/json',
      'api-key': publicKey.substring(0, 8) + '...',
      'sign': signatureHex.substring(0, 16) + '...'
    })
    console.log('   - Body:', message)

    // Make the API call
    console.log('📡 Making request to Changelly API...')
    let response: Response
    
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)
      
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: message,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      console.log('📥 API response received')
      
    } catch (fetchError) {
      console.error('❌ Network error:', fetchError)
      return new Response(
        JSON.stringify({ 
          error: 'Network error connecting to Changelly API',
          details: fetchError.message,
          debugInfo: { requestId, errorName: fetchError.name }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Process response
    console.log('📊 Response Details:')
    console.log('   - Status:', response.status)
    console.log('   - Status Text:', response.statusText)
    console.log('   - Headers:', Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log('📄 Raw response body:', responseText)
    console.log('📏 Response length:', responseText.length)

    // Handle non-200 responses
    if (!response.ok) {
      console.error('❌ API returned error status:', response.status)
      
      // Try to parse error response
      let errorDetails = responseText
      try {
        const errorJson = JSON.parse(responseText)
        errorDetails = JSON.stringify(errorJson, null, 2)
        console.log('📋 Parsed error response:', errorJson)
      } catch {
        console.log('📋 Could not parse error response as JSON')
      }
      
      // Special handling for 401 errors
      if (response.status === 401) {
        return new Response(
          JSON.stringify({
            error: 'Changelly API Authentication Failed',
            details: `The API returned 401 Unauthorized. This typically means:

1. **Invalid API Keys**: Your public or private key is incorrect
2. **Incorrect Signature**: The HMAC-SHA512 signature doesn't match
3. **Wrong Key Format**: Keys might be corrupted or incorrectly formatted

CURRENT CONFIGURATION:
- Public Key Length: ${publicKey.length} characters
- Private Key Length: ${privateKey.length} characters  
- Signature Length: ${signatureHex.length} characters

TROUBLESHOOTING STEPS:
1. Verify your keys in the Changelly merchant dashboard
2. Ensure the base64 encoding is correct: base64(public_key:private_key)
3. Check that keys don't have extra spaces or newlines

Raw API Response: ${errorDetails}`,
            status: response.status,
            debugInfo: {
              requestId,
              publicKeyLength: publicKey.length,
              privateKeyLength: privateKey.length,
              signatureLength: signatureHex.length,
              totalTime: Date.now() - requestStartTime
            }
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      return new Response(
        JSON.stringify({
          error: `Changelly API Error (${response.status})`,
          details: errorDetails,
          status: response.status,
          debugInfo: { requestId, totalTime: Date.now() - requestStartTime }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse successful response
    let responseData
    try {
      responseData = JSON.parse(responseText)
      console.log('✅ Response parsed successfully')
      console.log('📋 Response structure:', {
        hasResult: !!responseData.result,
        hasError: !!responseData.error,
        resultType: typeof responseData.result,
        keys: Object.keys(responseData)
      })
    } catch (parseError) {
      console.error('❌ Response parse error:', parseError)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON response from Changelly API',
          details: 'Could not parse API response',
          rawResponse: responseText.substring(0, 500),
          debugInfo: { requestId }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check for API-level errors in the response
    if (responseData.error) {
      console.error('❌ Changelly API error in response:', responseData.error)
      return new Response(
        JSON.stringify({
          error: 'Changelly API Error',
          details: responseData.error.message || JSON.stringify(responseData.error),
          code: responseData.error.code,
          debugInfo: { requestId, fullError: responseData.error }
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const totalTime = Date.now() - requestStartTime
    console.log('🎉 SUCCESS! Request completed in', totalTime, 'ms')
    console.log('📊 Final result:', {
      hasResult: !!responseData.result,
      resultType: typeof responseData.result,
      resultSample: Array.isArray(responseData.result) 
        ? `Array[${responseData.result.length}]` 
        : String(responseData.result).substring(0, 50)
    })
    console.log('=== CHANGELLY DEBUG SESSION END ===')

    return new Response(
      JSON.stringify({
        ...responseData,
        debugInfo: {
          requestId,
          totalTime,
          publicKeyLength: publicKey.length,
          privateKeyLength: privateKey.length,
          signatureLength: signatureHex.length
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('💥 Unexpected error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        stack: error.stack?.substring(0, 1000)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
