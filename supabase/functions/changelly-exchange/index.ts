
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
    console.log('Fetching Changelly API credentials from vault...')

    const { data: secretsData, error: secretsError } = await supabase
      .from('vault')
      .select('name, secret')
      .in('name', ['CHANGELLY_PUBLIC_KEY', 'CHANGELLY_PRIVATE_KEY'])

    if (secretsError) {
      console.error('Failed to fetch secrets from vault:', secretsError)
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

    if (!secretsData || secretsData.length !== 2) {
      console.error('Missing API credentials in vault. Found:', secretsData?.length || 0, 'credentials')
      return new Response(
        JSON.stringify({ 
          error: 'API credentials not properly configured',
          details: 'Please ensure both CHANGELLY_PUBLIC_KEY and CHANGELLY_PRIVATE_KEY are set in the vault'
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
      console.error('Missing required API keys in vault')
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

    console.log('API credentials retrieved successfully')
    console.log('Public key (first 8 chars):', publicKey.substring(0, 8))
    console.log('Private key length:', privateKey.length)

    // Validate credentials are not placeholder values
    if (publicKey.includes('placeholder') || privateKey.includes('placeholder') ||
        publicKey === 'your_public_key_here' || privateKey === 'your_private_key_here') {
      console.error('Placeholder API credentials detected')
      return new Response(
        JSON.stringify({ 
          error: 'Please update API credentials',
          details: 'Replace placeholder values with actual Changelly API keys'
        }),
        { 
          status: 500, 
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
    console.log('Changelly API request:', message)

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

    console.log('HMAC signature created (first 16 chars):', signatureHex.substring(0, 16))

    // Make request to Changelly API
    const changellyHeaders = {
      'Content-Type': 'application/json',
      'X-Api-Key': publicKey,
      'X-Api-Signature': signatureHex,
    }

    console.log('Making request to Changelly API...')
    console.log('Headers keys:', Object.keys(changellyHeaders))

    const changellyResponse = await fetch('https://api.changelly.com/v2', {
      method: 'POST',
      headers: changellyHeaders,
      body: message
    })

    console.log('Changelly API response status:', changellyResponse.status)
    console.log('Changelly API response ok:', changellyResponse.ok)

    const responseText = await changellyResponse.text()
    console.log('Changelly API response body:', responseText)

    if (!changellyResponse.ok) {
      console.error('Changelly API error response:', {
        status: changellyResponse.status,
        statusText: changellyResponse.statusText,
        body: responseText
      })
      
      return new Response(
        JSON.stringify({ 
          error: `Changelly API error: ${changellyResponse.status}`,
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
      console.error('Failed to parse Changelly response:', parseError)
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
      console.error('Changelly API returned error:', responseData.error)
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

    console.log('=== Changelly API request completed successfully ===')
    console.log('Response data:', JSON.stringify(responseData, null, 2))

    return new Response(
      JSON.stringify(responseData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('=== Edge Function Error ===')
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
