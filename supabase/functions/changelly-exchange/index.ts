
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, handleCorsPreflightRequest } from './cors.ts';
import { getChangellyApiKeys } from './api-keys.ts';
import { callChangellyApi } from './api-client.ts';
import type { ChangellyRequest } from './types.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return handleCorsPreflightRequest();
  }

  try {
    const requestStartTime = Date.now();
    const requestId = crypto.randomUUID();
    console.log('=== CHANGELLY DEBUG SESSION START ===');
    console.log('🆔 Request ID:', requestId);
    console.log('⏰ Timestamp:', new Date().toISOString());
    
    // Validate request method
    if (req.method !== 'POST') {
      console.error('❌ Invalid method:', req.method);
      return new Response(
        JSON.stringify({ error: 'Method not allowed. Use POST.' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
      console.log('✅ Request body parsed:', JSON.stringify(requestBody, null, 2));
    } catch (parseError) {
      console.error('❌ Request body parse error:', parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON in request body',
          details: parseError.message,
          debugInfo: { requestId, step: 'request_parsing' }
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { action, ...params } = requestBody;
    if (!action) {
      console.error('❌ Missing action parameter');
      return new Response(
        JSON.stringify({ 
          error: 'Missing action parameter',
          debugInfo: { requestId, step: 'action_validation' }
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🎯 Action requested:', action);
    console.log('📋 Parameters:', JSON.stringify(params, null, 2));

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    console.log('🔍 Environment check:');
    console.log('   - SUPABASE_URL exists:', !!supabaseUrl);
    console.log('   - SUPABASE_SERVICE_ROLE_KEY exists:', !!supabaseServiceKey);

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing Supabase environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'Server configuration error - Missing Supabase credentials',
          debugInfo: { 
            requestId, 
            step: 'supabase_env_check',
            hasUrl: !!supabaseUrl,
            hasKey: !!supabaseServiceKey
          }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    try {
      // Get API keys
      const apiKeys = await getChangellyApiKeys(supabaseUrl, supabaseServiceKey, requestId);

      // Create Changelly API request
      const changellyRequest: ChangellyRequest = {
        id: requestId,
        jsonrpc: "2.0",
        method: action,
        params: action === 'getCurrencies' ? {} : params
      };

      // Make API call
      const responseData = await callChangellyApi(changellyRequest, apiKeys, requestId);

      const totalTime = Date.now() - requestStartTime;
      console.log(`🎉 SUCCESS! Request completed in ${totalTime}ms`);
      console.log('=== CHANGELLY DEBUG SESSION END ===');

      return new Response(
        JSON.stringify({
          ...responseData,
          debugInfo: {
            requestId,
            totalTime,
            step: 'success'
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );

    } catch (error) {
      console.error('❌ API operation error:', error);
      
      let errorResponse;
      try {
        // Try to parse as JSON in case it's a structured error from api-client
        errorResponse = JSON.parse(error.message);
      } catch {
        // If not JSON, create a simple error response
        errorResponse = {
          error: 'API operation failed',
          details: error.message,
          debugInfo: { requestId, step: 'api_operation_error' }
        };
      }

      return new Response(
        JSON.stringify(errorResponse),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('💥 Unexpected top-level error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        debugInfo: { step: 'top_level_exception' }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
