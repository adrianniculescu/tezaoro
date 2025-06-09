
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

    // Get API credentials from vault - prioritize base64 key
    console.log('🔍 Fetching Changelly API keys from vault...')

    const { data: base64SecretData, error: base64Error } = await supabase
      .from('vault')
      .select('secret')
      .eq('name', 'CHANGELLY_API_KEY_BASE64')
      .maybeSingle()

    let publicKey, privateKey, useSandbox = false

    if (base64SecretData && base64SecretData.secret && !base64Error) {
      console.log('✅ Found CHANGELLY_API_KEY_BASE64, decoding...')
      try {
        const base64Secret = base64SecretData.secret.trim()
        console.log('🔍 Base64 secret length:', base64Secret.length)
        console.log('🔍 Base64 secret starts with:', base64Secret.substring(0, 20) + '...')
        
        const decodedKeys = atob(base64Secret)
        console.log('🔍 Decoded string length:', decodedKeys.length)
        console.log('🔍 Decoded string preview:', decodedKeys.substring(0, 50) + '...')
        
        const keyParts = decodedKeys.split(':')
        if (keyParts.length < 2) {
          throw new Error('Invalid base64 key format - expected "publickey:privatekey" or "publickey:privatekey:sandbox"')
        }
        publicKey = keyParts[0].trim()
        privateKey = keyParts[1].trim()
        
        // Check if sandbox flag is included
        if (keyParts.length === 3 && keyParts[2].trim().toLowerCase() === 'sandbox') {
          useSandbox = true
          console.log('🧪 Sandbox mode enabled')
        }
        
        console.log('✅ Successfully decoded base64 API keys')
        console.log('🔍 Public key length:', publicKey.length)
        console.log('🔍 Private key length:', privateKey.length)
        console.log('🔍 Public key prefix:', publicKey.substring(0, 8) + '...')
        console.log('🔍 Private key prefix:', privateKey.substring(0, 8) + '...')
        console.log('🔍 Using sandbox:', useSandbox)
      } catch (decodeError) {
        console.error('❌ Failed to decode base64 key:', decodeError)
        return new Response(
          JSON.stringify({ 
            error: 'Failed to decode API key',
            details: 'The CHANGELLY_API_KEY_BASE64 appears to be invalid. Please verify the key is properly base64 encoded in the format "publickey:privatekey" or "publickey:privatekey:sandbox".'
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
    } else {
      console.log('🔍 CHANGELLY_API_KEY_BASE64 not found, trying individual keys...')
      
      // Get individual keys as fallback
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
            details: 'Could not find CHANGELLY_API_KEY_BASE64 or individual CHANGELLY_PUBLIC_KEY/CHANGELLY_PRIVATE_KEY in vault.'
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

    // Enhanced key validation
    if (publicKey.length < 20 || privateKey.length < 20) {
      console.error('❌ API keys appear too short for Changelly API')
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

    // Enhanced placeholder detection
    const placeholderPatterns = [
      'your_public_key',
      'your_private_key', 
      'placeholder',
      'changelly_key',
      'example_key',
      'test_key',
      'demo_key',
      'insert_your',
      'replace_with'
    ]
    
    const publicKeyLower = publicKey.toLowerCase()
    const privateKeyLower = privateKey.toLowerCase()
    
    console.log('🔍 Checking for placeholder patterns...')
    
    const publicKeyHasPlaceholder = placeholderPatterns.some(pattern => publicKeyLower.includes(pattern))
    const privateKeyHasPlaceholder = placeholderPatterns.some(pattern => privateKeyLower.includes(pattern))
    
    if (publicKeyHasPlaceholder || privateKeyHasPlaceholder) {
      console.error('❌ API keys contain placeholder patterns')
      console.error('❌ Public key has placeholder?', publicKeyHasPlaceholder)
      console.error('❌ Private key has placeholder?', privateKeyHasPlaceholder)
      return new Response(
        JSON.stringify({ 
          error: 'Placeholder API credentials detected',
          details: 'Please replace placeholder API keys with real Changelly credentials from your account dashboard'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('✅ API key validation passed')

    // Test with a simple method first to validate credentials
    const testMethod = action === 'getCurrencies' ? 'getCurrencies' : 'getCurrencies'
    const testParams = action === 'getCurrencies' ? {} : params

    // Create request for Changelly API
    const requestId = crypto.randomUUID()
    const changellyRequest = {
      id: requestId,
      jsonrpc: "2.0",
      method: testMethod,
      params: testParams
    }

    const message = JSON.stringify(changellyRequest)
    console.log('📤 Changelly API request:', message)

    // Create HMAC signature
    const encoder = new TextEncoder()
    const keyData = encoder.encode(privateKey)
    const messageData = encoder.encode(message)
    
    console.log('🔐 Creating HMAC signature...')
    console.log('🔐 Private key for signing (first 10 chars):', privateKey.substring(0, 10) + '...')
    console.log('🔐 Message to sign length:', message.length)
    
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
          details: 'Error creating signature key - please verify your private key format'
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
          details: 'Error signing request - please verify your private key'
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
    console.log('🔐 HMAC signature (first 20 chars):', signatureHex.substring(0, 20) + '...')

    // Determine API endpoint based on sandbox flag
    const apiUrl = useSandbox ? 'https://api-sandbox.changelly.com/v2' : 'https://api.changelly.com/v2'
    console.log('🌐 Using API endpoint:', apiUrl)

    // Make request to Changelly API
    const changellyHeaders = {
      'Content-Type': 'application/json',
      'X-Api-Key': publicKey,
      'X-Api-Signature': signatureHex,
    }

    console.log('📡 Making request to Changelly API...')
    console.log('🔍 Request headers (sanitized):', {
      'Content-Type': 'application/json',
      'X-Api-Key': publicKey.substring(0, 12) + '...' + publicKey.substring(publicKey.length - 4),
      'X-Api-Signature': signatureHex.substring(0, 16) + '...'
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
      console.log('📥 Response headers:', Object.fromEntries(changellyResponse.headers.entries()))
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
      
      // Enhanced error response with specific guidance for 401 errors
      if (changellyResponse.status === 401) {
        return new Response(
          JSON.stringify({
            error: 'Invalid Changelly API credentials',
            details: `Authentication failed with Changelly API (401 Unauthorized). 

TROUBLESHOOTING STEPS:

1. **Verify API Key Status**: 
   - Log into your Changelly Pro dashboard
   - Check that your API keys are active and not disabled
   - Verify your account status is active

2. **Check API Key Permissions**:
   - Ensure your API keys have the required permissions
   - Some Changelly accounts require specific verification levels

3. **Verify Key Format**:
   - Public key should be alphanumeric (typically 32+ characters)
   - Private key should be alphanumeric (typically 64+ characters)
   - No extra spaces or special characters

4. **Test Environment**:
   - If using sandbox keys, ensure they're marked with ":sandbox" suffix
   - Production keys should work on main API endpoint

5. **Account Verification**:
   - Changelly may require account verification for API access
   - Check your email for any verification requests

Current endpoint: ${apiUrl}
Public key detected: ${publicKey.length} characters
Private key detected: ${privateKey.length} characters
Sandbox mode: ${useSandbox}

If issues persist, contact Changelly support with your API key details.`,
            status: changellyResponse.status,
            endpoint: apiUrl,
            sandbox: useSandbox,
            keyLengths: {
              public: publicKey.length,
              private: privateKey.length
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
