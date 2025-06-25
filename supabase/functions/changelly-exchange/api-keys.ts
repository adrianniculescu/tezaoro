
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import type { ApiKeys } from './types.ts';

export async function getChangellyApiKeys(
  supabaseUrl: string,
  supabaseServiceKey: string,
  requestId: string
): Promise<ApiKeys> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  let publicKey: string | null = null;
  let privateKey: string | null = null;

  // First, try to get the base64 encoded key from vault
  console.log('🔍 Attempting to fetch CHANGELLY_API_KEY_BASE64 from vault...');
  const { data: base64KeyData, error: base64KeyError } = await supabase
    .from('vault')
    .select('secret')
    .eq('name', 'CHANGELLY_API_KEY_BASE64')
    .maybeSingle();

  console.log('🔍 CHANGELLY_API_KEY_BASE64 query result:', {
    hasData: !!base64KeyData,
    hasSecret: !!base64KeyData?.secret,
    error: base64KeyError,
    secretLength: base64KeyData?.secret?.length || 0,
    secretPreview: base64KeyData?.secret ? base64KeyData.secret.substring(0, 20) + '...' : 'no secret'
  });

  if (base64KeyData?.secret && !base64KeyError) {
    console.log('✅ Found CHANGELLY_API_KEY_BASE64 in vault');
    try {
      const base64Secret = base64KeyData.secret.trim();
      console.log('🔍 Base64 secret details:', {
        length: base64Secret.length,
        preview: base64Secret.substring(0, 20) + '...',
        endsWithEquals: base64Secret.endsWith('=')
      });
      
      const decodedKeys = atob(base64Secret);
      console.log('🔍 Decoded keys details:', {
        length: decodedKeys.length,
        preview: decodedKeys.substring(0, 20) + '...',
        hasColon: decodedKeys.includes(':')
      });
      
      const keyParts = decodedKeys.split(':');
      console.log('🔍 Key parts:', {
        count: keyParts.length,
        part1Length: keyParts[0]?.length || 0,
        part2Length: keyParts[1]?.length || 0,
        part1Preview: keyParts[0]?.substring(0, 8) + '...' || 'empty',
        part2Preview: keyParts[1]?.substring(0, 8) + '...' || 'empty'
      });
      
      if (keyParts.length === 2 && keyParts[0].trim() && keyParts[1].trim()) {
        publicKey = keyParts[0].trim();
        privateKey = keyParts[1].trim();
        console.log('✅ Successfully decoded base64 API keys');
        console.log('🔑 Decoded key details:', {
          publicKeyLength: publicKey.length,
          privateKeyLength: privateKey.length,
          publicKeyPreview: publicKey.substring(0, 8) + '...',
          privateKeyPreview: privateKey.substring(0, 8) + '...'
        });
      } else {
        console.warn('⚠️ Invalid base64 key format - expected 2 parts separated by colon, got:', keyParts.length);
        console.warn('⚠️ Parts:', keyParts.map((part, index) => `Part ${index + 1}: "${part.substring(0, 10)}..."`));
      }
    } catch (decodeError) {
      console.warn('⚠️ Failed to decode base64 key:', decodeError.message);
      console.warn('⚠️ Raw secret (first 50 chars):', base64KeyData.secret.substring(0, 50));
    }
  } else {
    console.log('⚠️ CHANGELLY_API_KEY_BASE64 not found or error:', base64KeyError?.message);
  }

  // If base64 approach failed, try individual keys from vault
  if (!publicKey || !privateKey) {
    console.log('🔍 Base64 approach failed, trying individual keys from vault...');
    
    const [publicKeyResult, privateKeyResult] = await Promise.all([
      supabase.from('vault').select('secret').eq('name', 'CHANGELLY_PUBLIC_KEY').maybeSingle(),
      supabase.from('vault').select('secret').eq('name', 'CHANGELLY_PRIVATE_KEY').maybeSingle()
    ]);
    
    console.log('🔍 Individual keys query results:', {
      publicKey: {
        hasData: !!publicKeyResult.data,
        hasSecret: !!publicKeyResult.data?.secret,
        error: publicKeyResult.error,
        secretLength: publicKeyResult.data?.secret?.length || 0,
        secretPreview: publicKeyResult.data?.secret ? publicKeyResult.data.secret.substring(0, 8) + '...' : 'no secret'
      },
      privateKey: {
        hasData: !!privateKeyResult.data,
        hasSecret: !!privateKeyResult.data?.secret,
        error: privateKeyResult.error,
        secretLength: privateKeyResult.data?.secret?.length || 0,
        secretPreview: privateKeyResult.data?.secret ? privateKeyResult.data.secret.substring(0, 8) + '...' : 'no secret'
      }
    });
    
    if (publicKeyResult.data?.secret && privateKeyResult.data?.secret) {
      publicKey = publicKeyResult.data.secret.trim();
      privateKey = privateKeyResult.data.secret.trim();
      console.log('✅ Found individual API keys in vault');
    } else {
      console.log('⚠️ Individual keys not found in vault');
    }
  }

  // Final validation
  if (!publicKey || !privateKey) {
    console.error('❌ No valid Changelly SWAP API keys found in any location');
    throw new Error('No valid Changelly SWAP API keys found. Please add CHANGELLY_API_KEY_BASE64 (base64 encoded "public:private") to Supabase secrets');
  }

  // Enhanced placeholder detection for SWAP API
  const placeholderPatterns = [
    'your_',
    'placeholder',
    'changelly_public_key',
    'changelly_private_key',
    'your_actual_changelly',
    'example_',
    'demo_',
    'test_key',
    'sample_',
    'swap_api_key',
    'api_key_here'
  ];

  const isPlaceholderPublic = placeholderPatterns.some(pattern => 
    publicKey.toLowerCase().includes(pattern.toLowerCase())
  ) || publicKey.length < 8;

  const isPlaceholderPrivate = placeholderPatterns.some(pattern => 
    privateKey.toLowerCase().includes(pattern.toLowerCase())
  ) || privateKey.length < 8;

  if (isPlaceholderPublic || isPlaceholderPrivate) {
    console.error('❌ Detected placeholder SWAP API keys. Current values:');
    console.error('   - Public key:', publicKey);
    console.error('   - Private key:', privateKey);
    console.error('');
    console.error('Real Changelly SWAP API keys should look like alphanumeric strings.');
    console.error('');
    console.error('To get real SWAP API keys:');
    console.error('1. Go to https://changelly.com/business/exchange-api');
    console.error('2. Sign up for the SWAP API service');
    console.error('3. Navigate to API settings');
    console.error('4. Generate new SWAP API keys');
    console.error('5. Copy the REAL keys (not the placeholder text)');
    
    throw new Error(`
PLACEHOLDER SWAP API KEYS DETECTED!

Current values contain placeholder text:
- Public key: ${publicKey.substring(0, 30)}...
- Private key: ${privateKey.substring(0, 30)}...

You need REAL Changelly SWAP API keys from https://changelly.com/business/exchange-api

Please replace the CHANGELLY_API_KEY_BASE64 secret with base64-encoded real SWAP keys.
Format: base64encode("real_swap_public_key:real_swap_private_key")
`);
  }

  console.log('🔑 Final SWAP API keys validated:', {
    publicKeyLength: publicKey.length,
    privateKeyLength: privateKey.length,
    publicKeyPreview: publicKey.substring(0, 8) + '...',
    privateKeyPreview: privateKey.substring(0, 8) + '...'
  });

  return { publicKey, privateKey };
}
