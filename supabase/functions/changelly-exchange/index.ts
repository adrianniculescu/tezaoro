
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChangellyRequest {
  id: string
  jsonrpc: string
  method: string
  params: any
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Changelly edge function called with method:', req.method)
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Attempting to retrieve Changelly API credentials from vault...')

    // Get Changelly API credentials from Supabase secrets
    const { data: publicKeyData, error: publicKeyError } = await supabase
      .from('vault')
      .select('secret')
      .eq('name', 'CHANGELLY_PUBLIC_KEY')
      .single()

    if (publicKeyError || !publicKeyData) {
      console.error('Failed to retrieve CHANGELLY_PUBLIC_KEY:', publicKeyError)
      throw new Error('CHANGELLY_PUBLIC_KEY not found in vault. Please add it through the Supabase dashboard.')
    }

    const { data: privateKeyData, error: privateKeyError } = await supabase
      .from('vault')
      .select('secret')
      .eq('name', 'CHANGELLY_PRIVATE_KEY')
      .single()

    if (privateKeyError || !privateKeyData) {
      console.error('Failed to retrieve CHANGELLY_PRIVATE_KEY:', privateKeyError)
      throw new Error('CHANGELLY_PRIVATE_KEY not found in vault. Please add it through the Supabase dashboard.')
    }

    const publicKey = publicKeyData.secret
    const privateKey = privateKeyData.secret

    console.log('Successfully retrieved API credentials')
    console.log('Public Key:', publicKey.substring(0, 8) + '...')
    console.log('Private Key length:', privateKey?.length || 0)

    // Validate that keys are not placeholder values
    if (publicKey === 'your_public_key_here' || privateKey === 'your_private_key_here' || 
        publicKey.includes('placeholder') || privateKey.includes('placeholder')) {
      throw new Error('Please replace placeholder API keys with your actual Changelly API credentials in the Supabase vault.')
    }

    const { action, ...params } = await req.json()
    console.log('Action requested:', action)
    console.log('Params:', JSON.stringify(params))

    // Create request ID and message
    const requestId = crypto.randomUUID()
    const message = JSON.stringify({
      id: requestId,
      jsonrpc: "2.0",
      method: action,
      params
    })

    console.log('Request message:', message)

    // Create HMAC signature for Changelly API
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

    console.log('HMAC signature created:', signatureHex.substring(0, 16) + '...')

    // Prepare headers for Changelly API v2
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Api-Key': publicKey,
      'X-Api-Signature': signatureHex,
    }

    console.log('Making request to Changelly API with headers:', Object.keys(headers))

    // Make request to Changelly API
    const response = await fetch('https://api.changelly.com/v2', {
      method: 'POST',
      headers,
      body: message
    })

    const responseText = await response.text()
    console.log('Changelly API response status:', response.status)
    console.log('Changelly API response headers:', Object.fromEntries(response.headers.entries()))
    console.log('Changelly API response body:', responseText)

    if (!response.ok) {
      console.error('Changelly API returned non-OK status:', response.status)
      throw new Error(`Changelly API error: ${response.status} - ${responseText}`)
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse Changelly API response:', parseError)
      throw new Error('Invalid response from Changelly API')
    }

    // Check for API-level errors
    if (data.error) {
      console.error('Changelly API returned an error:', data.error)
      throw new Error(`Changelly API error: ${data.error.message || JSON.stringify(data.error)}`)
    }

    console.log('Changelly API request completed successfully')

    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Changelly API error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Check the edge function logs for more information. Make sure your Changelly API keys are correct.'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
