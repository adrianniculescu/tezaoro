
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

const CHANGELLY_DEX_API_URL = 'https://api.changelly.com/dex'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { endpoint, params } = await req.json()
    
    // Get the DEX API key from Supabase secrets
    const dexApiKey = Deno.env.get('CHANGELLY_DEX_API_KEY')
    
    if (!dexApiKey) {
      throw new Error('DEX API key not configured')
    }

    console.log(`Making DEX API request to: ${endpoint}`)
    
    const response = await fetch(`${CHANGELLY_DEX_API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': dexApiKey
      },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('DEX API error:', { status: response.status, body: errorText })
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    
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
