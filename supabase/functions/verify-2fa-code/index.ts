
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, code } = await req.json()

    if (!email || !code) {
      throw new Error('Email and code are required')
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Verify 2FA code using database function
    const { data: isValid, error: verifyError } = await supabase
      .rpc('verify_2fa_code', { 
        user_email: email, 
        input_code: code 
      })

    if (verifyError) {
      console.error('Error verifying 2FA code:', verifyError)
      throw new Error('Failed to verify code')
    }

    console.log(`2FA verification for ${email}: ${isValid ? 'SUCCESS' : 'FAILED'}`)

    return new Response(
      JSON.stringify({ 
        valid: isValid,
        message: isValid ? 'Code verified successfully' : 'Invalid or expired code'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error in verify-2fa-code function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
