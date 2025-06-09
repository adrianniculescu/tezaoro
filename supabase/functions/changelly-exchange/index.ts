
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

    // Very specific placeholder detection - only check for exact matches to obvious placeholders
    const exactPlaceholderPatterns = [
      'your_public_key_here',
      'your_private_key_here', 
      'placeholder_public_key',
      'placeholder_private_key',
      'changelly_public_key_here',
      'changelly_private_key_here',
      'insert_your_public_key',
      'insert_your_private_key',
      'example_public_key',
      'example_private_key'
    ]
    
    const publicKeyLower = publicKey.toLowerCase()
    const privateKeyLower = privateKey.toLowerCase()
    
    console.log('🔍 Checking for exact placeholder matches...')
    
    const publicKeyIsExactPlaceholder = exactPlaceholderPatterns.includes(publicKeyLower)
    const privateKeyIsExactPlaceholder = exactPlaceholderPatterns.includes(privateKeyLower)
    
    if (publicKeyIsExactPlaceholder || privateKeyIsExactPlaceholder) {
      console.error('❌ API keys are exact placeholder matches')
      console.error('❌ Public key placeholder?', publicKeyIsExactPlaceholder)
      console.error('❌ Private key placeholder?', privateKeyIsExactPlaceholder)
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
    console.log('🔍 Request headers (without signature):', {
      'Content-Type': 'application/json',
      'X-Api-Key': publicKey.substring(0, 10) + '...',
      'X-Api-Signature': '[REDACTED]'
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
      
      // Enhanced error response with specific guidance for 401 errors
      if (changellyResponse.status === 401) {
        return new Response(
          JSON.stringify({
            error: 'Invalid Changelly API credentials',
            details: `Authentication failed with Changelly API (401 Unauthorized). 

Troubleshooting steps:
1. Verify your API keys are correct and copied exactly from Changelly dashboard
2. Ensure you're using PRODUCTION keys (not sandbox) unless you've set sandbox mode
3. Check that API access is enabled in your Changelly account settings
4. Verify your Changelly account is active and verified
5. Make sure the keys have the necessary permissions for the API calls you're making

If using sandbox keys, encode them as: "publickey:privatekey:sandbox" in base64.

Current endpoint: ${apiUrl}
Key validation: PASSED
Signature creation: SUCCESS
Authentication: FAILED`,
            status: changellyResponse.status,
            endpoint: apiUrl,
            sandbox: useSandbox
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
