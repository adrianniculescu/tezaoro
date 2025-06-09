
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

    // Get API credentials from vault - only looking for CHANGELLY_API_KEY_BASE64
    console.log('🔍 Fetching CHANGELLY_API_KEY_BASE64 from vault...')

    const { data: secretsData, error: secretsError } = await supabase
      .from('vault')
      .select('name, secret, updated_at, created_at')
      .eq('name', 'CHANGELLY_API_KEY_BASE64')
      .single()

    if (secretsError) {
      console.error('❌ Failed to fetch CHANGELLY_API_KEY_BASE64 from vault:', secretsError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to retrieve API credentials',
          details: 'CHANGELLY_API_KEY_BASE64 not found in vault',
          debug_info: {
            supabase_error: secretsError,
            vault_query: 'Failed to query vault table for CHANGELLY_API_KEY_BASE64'
          }
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (!secretsData || !secretsData.secret) {
      console.error('❌ CHANGELLY_API_KEY_BASE64 not found or empty')
      return new Response(
        JSON.stringify({ 
          error: 'API credentials not configured',
          details: 'Please ensure CHANGELLY_API_KEY_BASE64 is set in the Supabase vault',
          debug_info: {
            vault_response: secretsData,
            expected_secret: 'CHANGELLY_API_KEY_BASE64'
          }
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('✅ Found CHANGELLY_API_KEY_BASE64')
    console.log('🔍 Base64 key length:', secretsData.secret.length)
    console.log('🔍 Base64 key preview:', secretsData.secret.substring(0, 20) + '...')
    console.log('🕒 Updated:', secretsData.updated_at)

    // Decode the base64 API key
    let publicKey, privateKey
    try {
      const decodedKeys = atob(secretsData.secret.trim())
      console.log('🔍 Decoded string length:', decodedKeys.length)
      console.log('🔍 Decoded preview:', decodedKeys.substring(0, 20) + '...')
      
      const keyParts = decodedKeys.split(':')
      if (keyParts.length !== 2) {
        console.error('❌ Invalid base64 key format. Expected format: base64(public_key:private_key)')
        return new Response(
          JSON.stringify({ 
            error: 'Invalid API key format',
            details: 'The CHANGELLY_API_KEY_BASE64 must contain public and private keys separated by a colon, then base64 encoded. Format: base64(public_key:private_key)',
            debug_info: {
              key_parts_found: keyParts.length,
              expected_format: 'base64(public_key:private_key)',
              decoded_preview: decodedKeys.substring(0, 50) + '...'
            }
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      publicKey = keyParts[0].trim()
      privateKey = keyParts[1].trim()
      
      console.log('✅ Successfully decoded base64 API keys')
      console.log('🔍 Public key length:', publicKey.length)
      console.log('🔍 Private key length:', privateKey.length)
      
    } catch (decodeError) {
      console.error('❌ Failed to decode base64 key:', decodeError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to decode API key',
          details: 'The CHANGELLY_API_KEY_BASE64 appears to be invalid base64. Please verify the key is properly base64 encoded.',
          debug_info: {
            decode_error: decodeError.message,
            base64_key_preview: secretsData.secret.substring(0, 20) + '...'
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
      console.error('❌ Decoded API credentials are null or empty')
      return new Response(
        JSON.stringify({ 
          error: 'API credentials are empty',
          details: 'The decoded API keys are empty. Please ensure your Changelly API keys are properly set and not empty',
          debug_info: {
            public_key_empty: !publicKey || publicKey.length === 0,
            private_key_empty: !privateKey || privateKey.length === 0,
            public_key_length: publicKey?.length || 0,
            private_key_length: privateKey?.length || 0
          }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Enhanced key validation
    console.log('🔍 Detailed key analysis:')
    console.log('🔍 Public key starts with:', publicKey.substring(0, 10))
    console.log('🔍 Public key ends with:', publicKey.substring(publicKey.length - 10))
    console.log('🔍 Private key starts with:', privateKey.substring(0, 10))
    console.log('🔍 Private key ends with:', privateKey.substring(privateKey.length - 10))

    if (publicKey.length < 20 || privateKey.length < 20) {
      console.error('❌ API keys appear too short for Changelly API')
      console.error('🔍 Public key length:', publicKey.length)
      console.error('🔍 Private key length:', privateKey.length)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid API key format',
          details: `API keys appear too short. Public: ${publicKey.length} chars, Private: ${privateKey.length} chars. Please verify your Changelly API keys.`,
          debug_info: {
            public_key_length: publicKey.length,
            private_key_length: privateKey.length,
            public_key_preview: publicKey.substring(0, 20) + '...',
            private_key_preview: privateKey.substring(0, 20) + '...'
          }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Enhanced placeholder detection
    const placeholderPatterns = [
      'your_', 'placeholder', 'example', 'test_key', 'sample', 'demo_', 'fake_',
      'changelly_public_key', 'changelly_private_key', 'actual_changelly'
    ]
    
    const publicKeyLower = publicKey.toLowerCase()
    const privateKeyLower = privateKey.toLowerCase()
    
    const publicKeyHasPlaceholder = placeholderPatterns.some(pattern => publicKeyLower.includes(pattern))
    const privateKeyHasPlaceholder = placeholderPatterns.some(pattern => privateKeyLower.includes(pattern))
    
    if (publicKeyHasPlaceholder || privateKeyHasPlaceholder) {
      console.error('❌ API keys appear to be placeholder values')
      console.error('🔍 Public key contains placeholder:', publicKeyHasPlaceholder)
      console.error('🔍 Private key contains placeholder:', privateKeyHasPlaceholder)
      console.error('🔍 Detected patterns in public key:', placeholderPatterns.filter(p => publicKeyLower.includes(p)))
      console.error('🔍 Detected patterns in private key:', placeholderPatterns.filter(p => privateKeyLower.includes(p)))
      
      return new Response(
        JSON.stringify({ 
          error: 'Placeholder API credentials detected',
          details: 'Please replace placeholder API keys with real Changelly credentials from your account dashboard',
          debug_info: {
            public_key_placeholder: publicKeyHasPlaceholder,
            private_key_placeholder: privateKeyHasPlaceholder,
            public_key_preview: publicKey.substring(0, 20) + '...',
            private_key_preview: privateKey.substring(0, 20) + '...',
            detected_patterns: {
              public: placeholderPatterns.filter(p => publicKeyLower.includes(p)),
              private: placeholderPatterns.filter(p => privateKeyLower.includes(p))
            }
          }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('✅ API key validation passed - no placeholders detected')

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
          details: 'Error creating signature key - please verify your private key format',
          debug_info: {
            crypto_error: keyError.message,
            private_key_length: privateKey.length
          }
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
          details: 'Error signing request - please verify your private key',
          debug_info: {
            sign_error: signError.message,
            message_length: message.length
          }
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
    console.log('🔐 Signature preview:', signatureHex.substring(0, 16) + '...')

    // Make request to Changelly API
    const changellyHeaders = {
      'Content-Type': 'application/json',
      'X-Api-Key': publicKey,
      'X-Api-Signature': signatureHex,
    }

    console.log('📡 Making request to Changelly API...')
    console.log('📡 Headers preview:', {
      'Content-Type': changellyHeaders['Content-Type'],
      'X-Api-Key': publicKey.substring(0, 8) + '...' + publicKey.substring(-4),
      'X-Api-Signature': signatureHex.substring(0, 16) + '...'
    })

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
      console.log('📥 Headers:', Object.fromEntries(changellyResponse.headers.entries()))
    } catch (fetchError) {
      console.error('❌ Network error calling Changelly API:', fetchError)
      return new Response(
        JSON.stringify({ 
          error: 'Network error connecting to Changelly API',
          details: fetchError.message,
          debug_info: {
            network_error: fetchError.message,
            api_endpoint: 'https://api.changelly.com/v2',
            request_headers: changellyHeaders,
            request_body: message
          }
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const responseText = await changellyResponse.text()
    console.log('📄 Changelly API response body (RAW):', responseText)
    console.log('📄 Response length:', responseText.length)

    if (!changellyResponse.ok) {
      console.error('❌ Changelly API error response:', {
        status: changellyResponse.status,
        statusText: changellyResponse.statusText,
        headers: Object.fromEntries(changellyResponse.headers.entries()),
        body: responseText
      })
      
      // Enhanced error response with full debugging info
      let errorDetails = {
        error: `Changelly API error: ${changellyResponse.status}`,
        details: responseText || changellyResponse.statusText,
        request: action,
        status: changellyResponse.status,
        response_body_raw: responseText,
        response_headers: Object.fromEntries(changellyResponse.headers.entries()),
        request_sent: {
          url: 'https://api.changelly.com/v2',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': publicKey.substring(0, 8) + '...' + publicKey.substring(-8),
            'X-Api-Signature': signatureHex.substring(0, 16) + '...'
          },
          body_preview: message.substring(0, 200) + (message.length > 200 ? '...' : '')
        },
        debug_info: {
          api_credentials_used: {
            public_key_length: publicKey.length,
            private_key_length: privateKey.length,
            signature_length: signatureHex.length
          },
          timestamp: new Date().toISOString()
        }
      }
      
      // Provide specific error messages based on status code
      if (changellyResponse.status === 401) {
        console.error('🔍 401 Unauthorized Analysis:')
        console.error('  - This indicates invalid API credentials')
        console.error('  - Public key format appears valid, length:', publicKey.length)
        console.error('  - Private key format appears valid, length:', privateKey.length)
        console.error('  - HMAC signature length correct:', signatureHex.length === 128)
        console.error('  - Possible causes:')
        console.error('    1. Keys are from Changelly SANDBOX instead of PRODUCTION')
        console.error('    2. API access not enabled in Changelly dashboard')
        console.error('    3. Keys belong to different API version')
        console.error('    4. Account suspended or restricted')
        
        errorDetails.error = 'Invalid Changelly API credentials'
        errorDetails.details = 'The Changelly API rejected your credentials (401 Unauthorized). Possible causes:\n\n1. Using SANDBOX keys instead of PRODUCTION keys\n2. API access not enabled in your Changelly dashboard\n3. Keys from wrong API version\n4. Account suspended or restricted\n\nPlease verify:\n- Your keys are for PRODUCTION (not sandbox)\n- API access is enabled in your Changelly account\n- Your account status is active'
        
        return new Response(
          JSON.stringify(errorDetails),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
      
      return new Response(
        JSON.stringify(errorDetails),
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
          details: responseText,
          debug_info: {
            parse_error: parseError.message,
            response_body_raw: responseText,
            response_length: responseText.length
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
          response_body_raw: responseText,
          debug_info: {
            changelly_error: responseData.error,
            full_response: responseData
          }
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
        timestamp: new Date().toISOString(),
        debug_info: {
          error_name: error.name,
          error_stack: error.stack,
          function_version: 'streamlined-base64-only-v1'
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
