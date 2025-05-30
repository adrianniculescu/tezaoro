
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

const CHANGELLY_API_URL = 'https://api.changelly.com'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { method, params } = await req.json()
    
    const publicKey = Deno.env.get('CHANGELLY_PUBLIC_KEY')
    const privateKey = Deno.env.get('CHANGELLY_PRIVATE_KEY')
    
    if (!publicKey || !privateKey) {
      throw new Error('Changelly API keys not configured')
    }

    const payload = {
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params
    }

    console.log(`Making Changelly API request: ${method}`)
    
    const response = await fetch(CHANGELLY_API_URL, {
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
      console.error('Changelly API error:', { status: response.status, body: errorText })
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    
    if (data.error) {
      console.error('Changelly API error response:', data.error)
      throw new Error(`API Error: ${data.error.message || 'Unknown error'}`)
    }
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error occurred',
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
