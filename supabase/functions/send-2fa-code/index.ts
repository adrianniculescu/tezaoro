
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
    const { email } = await req.json()

    if (!email) {
      throw new Error('Email is required')
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Generate 2FA code using database function
    const { data: code, error: codeError } = await supabase
      .rpc('generate_2fa_code', { user_email: email })

    if (codeError) {
      console.error('Error generating 2FA code:', codeError)
      throw new Error('Failed to generate verification code')
    }

    console.log(`Generated 2FA code for ${email}: ${code}`)

    // For now, we'll just log the code since we don't have email sending set up
    // In production, you would send this via email service like Resend
    console.log(`2FA Code for ${email}: ${code}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Verification code generated successfully',
        // In development, return the code for testing
        code: Deno.env.get('DENO_DEPLOYMENT_ID') ? undefined : code
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error in send-2fa-code function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
