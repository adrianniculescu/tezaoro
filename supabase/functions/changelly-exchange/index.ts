
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
    console.log('=== Changelly Edge Function Started ===')
    console.log('Request method:', req.method)
    console.log('Request URL:', req.url)
    console.log('Timestamp:', new Date().toISOString())
    console.log('Request ID:', crypto.randomUUID())

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
      console.log('✅ Request body parsed successfully:', JSON.stringify(requestBody, null, 2))
    } catch (parseError) {
      console.error('❌ Failed to parse request body:', parseError)
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
      console.error('❌ Missing action parameter')
      return new Response(
        JSON.stringify({ error: 'Missing action parameter' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
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
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    console.log('✅ Supabase client initialized')

    // Get the base64 encoded API key
    console.log('🔍 Fetching CHANGELLY_API_KEY_BASE64...')
    const keyFetchStart = Date.now()
    
    const { data: base64KeyData, error: base64KeyError } = await supabase
      .from('vault')
      .select('secret')
      .eq('name', 'CHANGELLY_API_KEY_BASE64')
      .maybeSingle()

    const keyFetchTime = Date.now() - keyFetchStart
    console.log(`⏱️ Key fetch took ${keyFetchTime}ms`)
    console.log('🔍 Raw key data result:', { 
      hasData: !!base64KeyData, 
      hasError: !!base64KeyError,
      errorDetails: base64KeyError
    })

    if (base64KeyError) {
      console.error('❌ Failed to fetch base64 API key:', base64KeyError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to retrieve API credentials',
          details: 'Could not fetch CHANGELLY_API_KEY_BASE64 from vault.',
          debugInfo: { keyFetchTime, error: base64KeyError }
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (!base64KeyData?.secret) {
      console.error('❌ CHANGELLY_API_KEY_BASE64 not found in vault')
      return new Response(
        JSON.stringify({ 
          error: 'API credentials not configured',
          details: 'CHANGELLY_API_KEY_BASE64 not found in the Supabase vault. Please set this secret with your base64 encoded Changelly API keys.'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('✅ Found base64 encoded key')
    console.log('🔍 Raw secret value length:', base64KeyData.secret?.length || 0)
    console.log('🔍 Raw secret preview (first 20 chars):', base64KeyData.secret?.substring(0, 20) || 'N/A')
    
    let publicKey: string
    let privateKey: string

    try {
      const rawSecret = base64KeyData.secret.trim()
      console.log('🔍 Trimmed secret length:', rawSecret.length)
      console.log('🔍 Attempting to decode base64...')
      
      const decodedKey = atob(rawSecret)
      console.log('✅ Base64 decoded successfully')
      console.log('🔍 Decoded key length:', decodedKey.length)
      console.log('🔍 Decoded key preview (first 50 chars):', decodedKey.substring(0, 50))
      
      const keyParts = decodedKey.split(':')
      console.log('🔍 Key parts after split:', keyParts.length)
      
      if (keyParts.length !== 2) {
        throw new Error(`Expected 2 parts (public:private), got ${keyParts.length} parts`)
      }
      
      publicKey = keyParts[0].trim()
      privateKey = keyParts[1].trim()
      
      console.log('✅ Successfully parsed keys')
      console.log('🔍 Public key length:', publicKey.length)
      console.log('🔍 Private key length:', privateKey.length)
      console.log('🔍 Public key preview:', publicKey.substring(0, 10) + '...' + publicKey.substring(publicKey.length - 4))
      console.log('🔍 Private key preview:', privateKey.substring(0, 10) + '...' + privateKey.substring(privateKey.length - 4))
      
    } catch (decodeError) {
      console.error('❌ Failed to decode base64 key:', decodeError)
      console.error('❌ Error details:', {
        name: decodeError.name,
        message: decodeError.message,
        stack: decodeError.stack?.substring(0, 500)
      })
      return new Response(
        JSON.stringify({ 
          error: 'Invalid base64 key format',
          details: `Base64 key decoding failed: ${decodeError.message}. Please ensure your CHANGELLY_API_KEY_BASE64 secret is properly formatted as base64(public_key:private_key).`,
          debugInfo: {
            secretLength: base64KeyData.secret?.length || 0,
            errorName: decodeError.name,
            errorMessage: decodeError.message
          }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate credentials exist and are not empty
    if (!publicKey || !privateKey || publicKey.length === 0 || privateKey.length === 0) {
      console.error('❌ API credentials are null or empty after parsing')
      return new Response(
        JSON.stringify({ 
          error: 'API credentials are empty',
          details: 'The decoded API keys are empty. Please ensure your base64 encoded key contains valid public and private keys.',
          debugInfo: {
            publicKeyLength: publicKey?.length || 0,
            privateKeyLength: privateKey?.length || 0
          }
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
    console.log('🆔 Request ID:', requestId)

    // Create HMAC-SHA512 signature
    console.log('🔐 Creating HMAC-SHA512 signature...')
    const signatureStart = Date.now()
    
    try {
      const encoder = new TextEncoder()
      const keyData = encoder.encode(privateKey)
      const messageData = encoder.encode(message)
      
      console.log('🔍 Key data length:', keyData.length)
      console.log('🔍 Message data length:', messageData.length)
      
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-512' },
        false,
        ['sign']
      )
      
      console.log('✅ Crypto key imported successfully')
      
      const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData)
      const signatureHex = Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
      
      const signatureTime = Date.now() - signatureStart
      console.log(`✅ HMAC-SHA512 signature created in ${signatureTime}ms`)
      console.log('🔐 Signature length:', signatureHex.length)
      console.log('🔐 Signature preview:', signatureHex.substring(0, 20) + '...')

      // Make request to Changelly API
      const apiUrl = 'https://api.changelly.com'
      console.log('🌐 Using API endpoint:', apiUrl)
      console.log('🕐 Total preparation time:', Date.now() - requestStartTime, 'ms')

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

      const apiCallStart = Date.now()
      let changellyResponse
      
      try {
        // Set a reasonable timeout for the API call
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
        
        changellyResponse = await fetch(apiUrl, {
          method: 'POST',
          headers: changellyHeaders,
          body: message,
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        const apiCallTime = Date.now() - apiCallStart
        
        console.log(`📥 Changelly API response received in ${apiCallTime}ms`)
        console.log('📥 Status:', changellyResponse.status)
        console.log('📥 Status Text:', changellyResponse.statusText)
        console.log('📥 Response Headers:', Object.fromEntries(changellyResponse.headers.entries()))
        
      } catch (fetchError) {
        const apiCallTime = Date.now() - apiCallStart
        console.error(`❌ Network error calling Changelly API after ${apiCallTime}ms:`, fetchError)
        
        let errorDetails = 'Unknown network error'
        if (fetchError.name === 'AbortError') {
          errorDetails = 'Request timed out after 30 seconds'
        } else if (fetchError.message) {
          errorDetails = fetchError.message
        }
        
        return new Response(
          JSON.stringify({ 
            error: 'Network error connecting to Changelly API',
            details: errorDetails,
            debugInfo: { 
              apiCallTime,
              errorName: fetchError.name,
              totalTime: Date.now() - requestStartTime
            }
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      const responseParseStart = Date.now()
      const responseText = await changellyResponse.text()
      const responseParseTime = Date.now() - responseParseStart
      
      console.log(`📄 Response body parsed in ${responseParseTime}ms`)
      console.log('📄 Response length:', responseText.length, 'characters')
      console.log('📄 Full response body:', responseText)

      if (!changellyResponse.ok) {
        console.error('❌ Changelly API error response:', {
          status: changellyResponse.status,
          statusText: changellyResponse.statusText,
          body: responseText
        })
        
        // Try to parse error response for more details
        let errorDetails = responseText
        try {
          const errorJson = JSON.parse(responseText)
          errorDetails = JSON.stringify(errorJson, null, 2)
          console.log('📋 Parsed error response:', errorJson)
        } catch (parseErr) {
          console.log('📋 Could not parse error response as JSON')
        }
        
        if (changellyResponse.status === 401) {
          return new Response(
            JSON.stringify({
              error: 'Invalid Changelly API credentials',
              details: `Authentication failed with Changelly API (401 Unauthorized). 

TROUBLESHOOTING STEPS:

1. **Verify Base64 Key Format**: 
   - Your base64 key should decode to: public_key:private_key
   - Current decoded public key length: ${publicKey.length} chars
   - Current decoded private key length: ${privateKey.length} chars

2. **Check Keys in Changelly Dashboard**:
   - Log into your Changelly account
   - Go to API settings
   - Ensure keys are active and correctly copied
   - Make sure you're using the correct public/private key pair

3. **Test Key Format**:
   - Public key should be around 32 characters
   - Private key should be around 64 characters
   - Keys should only contain alphanumeric characters

Full response from Changelly: ${errorDetails}`,
              status: changellyResponse.status,
              endpoint: apiUrl,
              debugInfo: {
                requestId,
                totalTime: Date.now() - requestStartTime,
                apiCallTime: Date.now() - apiCallStart,
                publicKeyLength: publicKey.length,
                privateKeyLength: privateKey.length,
                signatureLength: signatureHex.length
              }
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
            details: errorDetails,
            status: changellyResponse.status,
            endpoint: apiUrl,
            debugInfo: {
              requestId,
              totalTime: Date.now() - requestStartTime,
              responseBody: responseText.substring(0, 1000) // Limit response size
            }
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
        console.log('📋 Successfully parsed Changelly response')
        console.log('📋 Response structure:', {
          hasResult: !!responseData.result,
          hasError: !!responseData.error,
          resultType: typeof responseData.result,
          resultLength: Array.isArray(responseData.result) ? responseData.result.length : 'not array'
        })
        console.log('📋 Full parsed response:', responseData)
      } catch (parseError) {
        console.error('❌ Failed to parse Changelly response:', parseError)
        console.error('❌ Raw response:', responseText)
        return new Response(
          JSON.stringify({ 
            error: 'Invalid response from Changelly API',
            details: 'Response is not valid JSON',
            rawResponse: responseText.substring(0, 500),
            debugInfo: {
              requestId,
              totalTime: Date.now() - requestStartTime
            }
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
            code: responseData.error.code,
            debugInfo: {
              requestId,
              totalTime: Date.now() - requestStartTime,
              fullError: responseData.error
            }
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      const totalTime = Date.now() - requestStartTime
      console.log(`🎉 Changelly API request completed successfully in ${totalTime}ms`)
      console.log('✅ Final response data:', {
        hasResult: !!responseData.result,
        resultType: typeof responseData.result,
        resultPreview: Array.isArray(responseData.result) 
          ? `Array with ${responseData.result.length} items` 
          : String(responseData.result).substring(0, 100)
      })

      return new Response(
        JSON.stringify({
          ...responseData,
          debugInfo: {
            requestId,
            totalTime,
            processingSteps: {
              keyFetch: keyFetchTime,
              signature: signatureTime,
              apiCall: Date.now() - apiCallStart,
              responseParse: responseParseTime
            }
          }
        }),
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

Please verify your base64 key format. It should contain your public and private keys separated by a colon, then base64 encoded.

Current private key length: ${privateKey?.length || 0} characters`,
          debugInfo: {
            totalTime: Date.now() - requestStartTime,
            signatureTime: Date.now() - signatureStart,
            cryptoErrorName: cryptoError.name,
            cryptoErrorMessage: cryptoError.message
          }
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
        timestamp: new Date().toISOString(),
        stack: error.stack?.substring(0, 1000) // Limit stack trace size
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
