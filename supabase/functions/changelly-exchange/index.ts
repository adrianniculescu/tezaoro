
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
    console.log('🔍 Public key first 10 chars:', publicKey?.substring(0, 10) || 'N/A')
    console.log('🔍 Private key first 10 chars:', privateKey?.substring(0, 10) || 'N/A')
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

    // More relaxed placeholder detection - only check for obvious placeholders
    const isObviousPlaceholder = (key: string) => {
      const lowerKey = key.toLowerCase()
      return lowerKey.includes('placeholder') ||
             lowerKey.includes('your_api_key_here') ||
             lowerKey.includes('your_public_key_here') || 
             lowerKey.includes('your_private_key_here') ||
             lowerKey.includes('example') ||
             lowerKey.includes('test_key') ||
             lowerKey.includes('demo_key') ||
             key === 'your_actual_changelly_public_key_here' ||
             key === 'your_actual_changelly_private_key_here'
    }

    if (isObviousPlaceholder(publicKey) || isObviousPlaceholder(privateKey)) {
      console.error('❌ Obvious placeholder API credentials detected')
      console.error('🔍 Public key:', publicKey.substring(0, 50))
      console.error('🔍 Private key:', privateKey.substring(0, 50))
      
      return new Response(
        JSON.stringify({ 
          error: 'Placeholder API credentials detected',
          details: 'The API keys appear to contain placeholder text. Please replace them with your actual Changelly API credentials.',
          public_key_preview: publicKey.substring(0, 50) + '...',
          private_key_preview: privateKey.substring(0, 50) + '...'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Basic key format validation - less strict
    if (publicKey.length < 50) {
      console.error('❌ Public key appears too short')
      console.error('📏 Public key length:', publicKey.length)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid public key format',
          details: `Public key appears too short (${publicKey.length} characters). Changelly public keys are typically longer.`
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
          details: `Private key appears too short (${privateKey.length} characters). Changelly private keys are typically longer.`
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

    console.log('🔐 HMAC signature created')

    // Make request to Changelly API
    const changellyHeaders = {
      'Content-Type': 'application/json',
      'X-Api-Key': publicKey,
      'X-Api-Signature': signatureHex,
    }

    console.log('📡 Making request to Changelly API...')

    const changellyResponse = await fetch('https://api.changelly.com/v2', {
      method: 'POST',
      headers: changellyHeaders,
      body: message
    })

    console.log('📥 Changelly API response status:', changellyResponse.status)

    const responseText = await changellyResponse.text()
    console.log('📄 Changelly API response body:', responseText)

    if (!changellyResponse.ok) {
      console.error('❌ Changelly API error response:', {
        status: changellyResponse.status,
        statusText: changellyResponse.statusText,
        body: responseText
      })
      
      let errorMessage = `Changelly API error: ${changellyResponse.status}`
      
      // Provide specific guidance for common errors
      if (changellyResponse.status === 401) {
        errorMessage = 'Invalid API credentials. Please verify your Changelly API keys are correct and have the necessary permissions.'
      } else if (changellyResponse.status === 403) {
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
