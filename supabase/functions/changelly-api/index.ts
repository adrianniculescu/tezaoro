
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { method, params } = await req.json()
    
    // Get API credentials from Supabase secrets
    const publicKey = Deno.env.get('CHANGELLY_PUBLIC_KEY')
    const privateKey = Deno.env.get('CHANGELLY_PRIVATE_KEY')
    
    if (!publicKey || !privateKey) {
      throw new Error('Changelly API credentials not configured')
    }

    const payload = {
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params
    }

    const response = await fetch('https://api-sandbox.changelly.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': publicKey,
        'X-API-Sign': privateKey // Note: In production, this should be a proper HMAC signature
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const data = await response.json()
    
    if (data.error) {
      throw new Error(`API Error: ${data.error.message || 'Unknown error'}`)
    }

    return new Response(JSON.stringify({ success: true, data: data.result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Changelly API error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error occurred' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
