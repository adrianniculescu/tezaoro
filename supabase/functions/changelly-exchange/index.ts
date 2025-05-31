
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

interface ExchangeQuoteParams {
  from: string
  to: string
  amount: string
}

interface CreateTransactionParams {
  from: string
  to: string
  amount: string
  address: string
  refundAddress?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get Changelly API credentials from Supabase secrets
    const { data: secrets, error: secretsError } = await supabase
      .from('vault')
      .select('secret')
      .eq('name', 'CHANGELLY_API_KEY')
      .single()

    if (secretsError || !secrets) {
      throw new Error('Changelly API key not found in secrets')
    }

    const { data: secretKeyData, error: secretKeyError } = await supabase
      .from('vault')
      .select('secret')
      .eq('name', 'CHANGELLY_SECRET_KEY')
      .single()

    if (secretKeyError || !secretKeyData) {
      throw new Error('Changelly secret key not found in secrets')
    }

    const apiKey = secrets.secret
    const secretKey = secretKeyData.secret
    const { action, ...params } = await req.json()

    // Create HMAC signature for Changelly API
    const message = JSON.stringify({
      id: crypto.randomUUID(),
      jsonrpc: "2.0",
      method: action,
      params
    })

    const encoder = new TextEncoder()
    const keyData = encoder.encode(secretKey)
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

    // Make request to Changelly API
    const response = await fetch('https://api.changelly.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
        'X-Api-Signature': signatureHex,
      },
      body: message
    })

    const data = await response.json()

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
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
