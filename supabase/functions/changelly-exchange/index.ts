
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
    console.log('🔍 Fetching Changelly API credentials from vault...')

    const { data: secretsData, error: secretsError } = await supabase
      .from('vault')
      .select('name, secret, updated_at, created_at')
      .in('name', ['CHANGELLY_PUBLIC_KEY', 'CHANGELLY_PRIVATE_KEY'])
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
    console.log('🔍 Secret names:', secretsData?.map(s => s.name) || [])

    if (!secretsData || secretsData.length === 0) {
      console.error('❌ No API credentials found in vault')
      return new Response(
        JSON.stringify({ 
          error: 'API credentials not found',
          details: 'Please ensure both CHANGELLY_PUBLIC_KEY and CHANGELLY_PRIVATE_KEY are set in the Supabase vault'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get the most recent credentials (in case of duplicates)
    const publicKeyRecord = secretsData.find(s => s.name === 'CHANGELLY_PUBLIC_KEY')
    const privateKeyRecord = secretsData.find(s => s.name === 'CHANGELLY_PRIVATE_KEY')

    if (!publicKeyRecord || !privateKeyRecord) {
      const missingKeys = []
      if (!publicKeyRecord) missingKeys.push('CHANGELLY_PUBLIC_KEY')
      if (!privateKeyRecord) missingKeys.push('CHANGELLY_PRIVATE_KEY')
      
      console.error('❌ Missing required API keys:', missingKeys)
      return new Response(
        JSON.stringify({ 
          error: 'Incomplete API credentials',
          details: `Missing keys: ${missingKeys.join(', ')}`,
          found_keys: secretsData?.map(s => s.name) || []
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const publicKey = publicKeyRecord.secret
    const privateKey = privateKeyRecord.secret

    console.log('✅ API credentials retrieved successfully')
    console.log('🔍 Public key length:', publicKey?.length || 0)
    console.log('🔍 Private key length:', privateKey?.length || 0)
    console.log('🔍 Public key updated:', publicKeyRecord.updated_at)
    console.log('🔍 Private key updated:', privateKeyRecord.updated_at)

    // Validate credentials are not null or empty
    if (!publicKey || !privateKey) {
      console.error('❌ API credentials are null or empty')
      return new Response(
        JSON.stringify({ 
          error: 'API credentials are empty',
          details: 'Please ensure your Changelly API keys are properly set in the vault'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Basic key length validation
    if (publicKey.length < 20) {
      console.error('❌ Public key appears too short')
      console.error('📏 Public key length:', publicKey.length)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid public key format',
          details: `Public key appears too short (${publicKey.length} characters). Please verify your Changelly public key.`
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (privateKey.length < 20) {
      console.error('❌ Private key appears too short')
      console.error('📏 Private key length:', privateKey.length)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid private key format',
          details: `Private key appears too short (${privateKey.length} characters). Please verify your Changelly private key.`
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

    // Create HMAC signature - Let's try a different approach
    const encoder = new TextEncoder()
    const keyData = encoder.encode(privateKey)
    const messageData = encoder.encode(message)
    
    console.log('🔐 Creating HMAC signature...')
    console.log('🔍 Message length:', message.length)
    console.log('🔍 Private key length for signature:', privateKey.length)
    
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

    console.log('🔐 HMAC signature details:')
    console.log('🔍 Signature length:', signatureHex.length)
    console.log('🔍 Signature first 20 chars:', signatureHex.substring(0, 20))

    // Make request to Changelly API
    const changellyHeaders = {
      'Content-Type': 'application/json',
      'X-Api-Key': publicKey,
      'X-Api-Signature': signatureHex,
    }

    console.log('📡 Making request to Changelly API...')
    console.log('🔍 Headers being sent:')
    console.log('  - Content-Type: application/json')
    console.log('  - X-Api-Key length:', publicKey.length)
    console.log('  - X-Api-Signature length:', signatureHex.length)

    let changellyResponse
    try {
      changellyResponse = await fetch('https://api.changelly.com/v2', {
        method: 'POST',
        headers: changellyHeaders,
        body: message
      })
      console.log('📥 Changelly API response received')
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

    console.log('📥 Changelly API response status:', changellyResponse.status)
    console.log('📥 Changelly API response headers:', Object.fromEntries(changellyResponse.headers.entries()))

    const responseText = await changellyResponse.text()
    console.log('📄 Changelly API response body:', responseText)

    if (!changellyResponse.ok) {
      console.error('❌ Changelly API error response:', {
        status: changellyResponse.status,
        statusText: changellyResponse.statusText,
        body: responseText
      })
      
      // Let's provide more specific error handling for 401
      if (changellyResponse.status === 401) {
        console.error('🔍 401 Error Analysis:')
        console.error('  - Public key being used:', publicKey.substring(0, 10) + '...')
        console.error('  - Private key being used:', privateKey.substring(0, 10) + '...')
        console.error('  - Message being signed:', message)
        console.error('  - Signature generated:', signatureHex.substring(0, 20) + '...')
        
        return new Response(
          JSON.stringify({ 
            error: 'Invalid API credentials detected by Changelly',
            details: 'The Changelly API rejected your credentials. Please verify that:\n1. Your API keys are correct and active\n2. Your API keys have the necessary permissions\n3. Your Changelly account is in good standing',
            debug_info: {
              public_key_preview: publicKey.substring(0, 15) + '...',
              private_key_preview: privateKey.substring(0, 15) + '...',
              signature_preview: signatureHex.substring(0, 20) + '...',
              request_id: requestId,
              message_length: message.length,
              signature_length: signatureHex.length
            }
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
      
      let errorMessage = `Changelly API error: ${changellyResponse.status}`
      
      if (changellyResponse.status === 403) {
        errorMessage = 'Access forbidden. Please check that your Changelly API keys have the required permissions for this operation.'
      }
      
      return new Response(
        JSON.stringify({ 
          error: errorMessage,
          details: responseText,
          request: action,
          debug_info: {
            public_key_length: publicKey.length,
            private_key_length: privateKey.length,
            request_id: requestId
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
