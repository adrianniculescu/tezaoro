
import type { ChangellyRequest, ChangellyResponse, ApiKeys } from './types.ts';
import { createHmacSignature } from './crypto-utils.ts';

// Changelly SWAP API endpoint (different from Pro API)
const CHANGELLY_SWAP_API_URL = 'https://api.changelly.com';

export async function callChangellyApi(
  request: ChangellyRequest,
  apiKeys: ApiKeys,
  requestId: string
): Promise<ChangellyResponse> {
  const message = JSON.stringify(request);
  console.log('📝 Changelly SWAP request message:', message);

  const signature = await createHmacSignature(message, apiKeys.privateKey);

  const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': apiKeys.publicKey,
    'X-Api-Signature': signature,
  };

  console.log('🌐 Making API call to Changelly SWAP API:');
  console.log('   - URL:', CHANGELLY_SWAP_API_URL);
  console.log('   - Method: POST');
  console.log('   - Content-Type:', headers['Content-Type']);
  console.log('   - X-Api-Key:', apiKeys.publicKey.substring(0, 8) + '...' + apiKeys.publicKey.substring(apiKeys.publicKey.length - 4));
  console.log('   - X-Api-Signature length:', signature.length);
  console.log('   - Request body length:', message.length);

  console.log('📡 Sending request to Changelly SWAP API...');
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.log('⏰ Request timeout after 30 seconds');
    controller.abort();
  }, 30000);
  
  try {
    const fetchStartTime = Date.now();
    const response = await fetch(CHANGELLY_SWAP_API_URL, {
      method: 'POST',
      headers: headers,
      body: message,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    const fetchTime = Date.now() - fetchStartTime;
    console.log(`📥 SWAP API response received in ${fetchTime}ms`);
    console.log('📊 Response status:', response.status);
    console.log('📊 Response status text:', response.statusText);
    console.log('📊 Response ok:', response.ok);
    console.log('📊 Response headers:', JSON.stringify(Object.fromEntries(response.headers.entries())));
    
    const responseText = await response.text();
    console.log('📄 Raw response body length:', responseText.length);
    console.log('📄 Raw response body preview:', responseText.substring(0, 500));
    if (responseText.length > 500) {
      console.log('📄 Response body truncated... (total length:', responseText.length, ')');
    }

    if (!response.ok) {
      console.error(`❌ SWAP API returned error status: ${response.status} ${response.statusText}`);
      console.error('❌ Full error response body:', responseText);
      
      let userFriendlyMessage = '';
      let detailedError = responseText;
      
      try {
        const errorData = JSON.parse(responseText);
        if (errorData.error) {
          detailedError = JSON.stringify(errorData.error, null, 2);
          if (errorData.error.message) {
            detailedError = errorData.error.message;
          }
        }
      } catch (parseError) {
        console.log('⚠️ Could not parse error response as JSON');
      }
      
      if (response.status === 401) {
        userFriendlyMessage = `Authentication failed with SWAP API. Please verify your Changelly SWAP API keys are correct and active.`;
      } else if (response.status === 403) {
        userFriendlyMessage = `Access forbidden with SWAP API. Your API keys may not have the required permissions for this operation.`;
      } else if (response.status === 400) {
        userFriendlyMessage = `Bad request to SWAP API. The API request format may be incorrect or missing required parameters.`;
      } else if (response.status === 429) {
        userFriendlyMessage = `Rate limit exceeded on SWAP API. Please wait before making more requests.`;
      } else if (response.status >= 500) {
        userFriendlyMessage = `Changelly SWAP server error (${response.status}). This is likely temporary.`;
      } else {
        userFriendlyMessage = `Unexpected SWAP API response status: ${response.status} ${response.statusText}`;
      }
      
      throw new Error(JSON.stringify({
        error: userFriendlyMessage,
        details: detailedError,
        debugInfo: {
          requestId,
          step: 'swap_api_error_response',
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          requestSent: {
            url: CHANGELLY_SWAP_API_URL,
            method: 'POST',
            headers: {
              'Content-Type': headers['Content-Type'],
              'X-Api-Key': headers['X-Api-Key'].substring(0, 8) + '...',
              'X-Api-Signature': headers['X-Api-Signature'].substring(0, 16) + '...'
            },
            bodyLength: message.length
          }
        }
      }));
    }

    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('✅ SWAP API response parsed successfully');
      console.log('📋 Response structure:', {
        hasId: !!responseData.id,
        hasJsonrpc: !!responseData.jsonrpc,
        hasResult: !!responseData.result,
        hasError: !!responseData.error,
        resultType: typeof responseData.result,
        resultLength: Array.isArray(responseData.result) ? responseData.result.length : 'not array'
      });
    } catch (parseError) {
      console.error('❌ SWAP API response parse error:', parseError);
      throw new Error(`Invalid JSON response from Changelly SWAP API: ${parseError.message}`);
    }

    if (responseData.error) {
      console.error('❌ Changelly SWAP API error in response:', responseData.error);
      throw new Error(`Changelly SWAP API returned an error: ${responseData.error.message || JSON.stringify(responseData.error)}`);
    }

    return responseData;
  } catch (fetchError) {
    console.error('❌ Network/Fetch error with SWAP API:', fetchError);
    if (fetchError.name === 'AbortError') {
      throw new Error('Request timeout to SWAP API - please try again');
    }
    throw new Error(`Network error connecting to Changelly SWAP API: ${fetchError.message}`);
  } finally {
    clearTimeout(timeoutId);
  }
}
