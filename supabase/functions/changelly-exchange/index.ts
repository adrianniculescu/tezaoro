
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

    console.log('📊 Secrets found:', secretsData?.length || 0)

    if (!secretsData || secretsData.length !== 2) {
      console.error('❌ Missing API credentials in vault. Found:', secretsData?.length || 0, 'credentials')
      return new Response(
        JSON.stringify({ 
          error: 'API credentials not properly configured',
          details: 'Please ensure both CHANGELLY_PUBLIC_KEY and CHANGELLY_PRIVATE_KEY are set in the Supabase vault'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const publicKeyRecord = secretsData.find(s => s.name === 'CHANGELLY_PUBLIC_KEY')
    const privateKeyRecord = secretsData.find(s => s.name === 'CHANGELLY_PRIVATE_KEY')

    if (!publicKeyRecord || !privateKeyRecord) {
      console.error('❌ Missing required API keys in vault')
      return new Response(
        JSON.stringify({ 
          error: 'Incomplete API credentials',
          details: 'Both public and private keys are required'
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

    // Enhanced placeholder detection with clearer messaging
    const isPlaceholder = (key: string) => {
      const lowerKey = key.toLowerCase()
      return lowerKey.includes('your_actual') ||
             lowerKey.includes('placeholder') ||
             lowerKey.includes('your_api_key_here') ||
             lowerKey.includes('your_public_key_here') || 
             lowerKey.includes('your_private_key_here') ||
             lowerKey.includes('example') ||
             lowerKey.includes('test_key') ||
             lowerKey.includes('demo_key') ||
             key.length < 20 // Changelly keys should be longer
    }

    if (isPlaceholder(publicKey) || isPlaceholder(privateKey)) {
      console.error('❌ Placeholder API credentials detected')
      console.error('🔍 Public key starts with:', publicKey.substring(0, 20))
      console.error('🔍 Private key starts with:', privateKey.substring(0, 20))
      
      return new Response(
        JSON.stringify({ 
          error: 'Placeholder API credentials detected',
          details: 'You need to replace the placeholder values with your actual Changelly API keys. Please visit https://changelly.com/developers to get your real API credentials and update them in the Supabase vault.'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // For Changelly API v2, public key should be base64 encoded RSA key
    if (!publicKey.startsWith('MII')) {
      console.error('❌ Invalid public key format - expected RSA key starting with MII')
      console.error('🔍 Public key format details:', {
        starts_with: publicKey.substring(0, 10),
        length: publicKey.length,
        is_base64_like: /^[A-Za-z0-9+/]*={0,2}$/.test(publicKey)
      })
      return new Response(
        JSON.stringify({ 
          error: 'Invalid public key format',
          details: 'Changelly public key should be a base64-encoded RSA key starting with "MII". Please ensure you copied the correct public key from your Changelly API settings.'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Additional validation - check key lengths
    if (publicKey.length < 100 || privateKey.length < 20) {
      console.error('❌ Invalid API key lengths')
      console.error('📏 Key lengths:', { publicKey: publicKey.length, privateKey: privateKey.length })
      return new Response(
        JSON.stringify({ 
          error: 'Invalid API key format',
          details: 'API keys appear to be too short. Please verify you copied the complete keys from Changelly.'
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
          request: action
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
