
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

  if (base64KeyData?.secret && !base64KeyError) {
    console.log('✅ Found CHANGELLY_API_KEY_BASE64 in vault');
    try {
      const decodedKeys = atob(base64KeyData.secret.trim());
      const keyParts = decodedKeys.split(':');
      
      if (keyParts.length === 2) {
        publicKey = keyParts[0].trim();
        privateKey = keyParts[1].trim();
        console.log('✅ Successfully decoded base64 API keys');
      } else {
        console.warn('⚠️ Invalid base64 key format, trying individual keys...');
      }
    } catch (decodeError) {
      console.warn('⚠️ Failed to decode base64 key:', decodeError.message);
    }
  } else {
    console.log('⚠️ CHANGELLY_API_KEY_BASE64 not found or error:', base64KeyError?.message);
  }

  // If base64 approach failed, try individual keys from Deno environment
  if (!publicKey || !privateKey) {
    console.log('🔍 Trying to get individual API keys from environment...');
    
    const envPublicKey = Deno.env.get('CHANGELLY_PUBLIC_KEY');
    const envPrivateKey = Deno.env.get('CHANGELLY_PRIVATE_KEY');
    
    if (envPublicKey && envPrivateKey) {
      publicKey = envPublicKey.trim();
      privateKey = envPrivateKey.trim();
      console.log('✅ Found individual API keys in environment');
    } else {
      console.log('⚠️ Individual keys not found in environment');
      
      // Try to get individual keys from vault as fallback
      console.log('🔍 Trying individual keys from vault...');
      
      const [publicKeyResult, privateKeyResult] = await Promise.all([
        supabase.from('vault').select('secret').eq('name', 'CHANGELLY_PUBLIC_KEY').maybeSingle(),
        supabase.from('vault').select('secret').eq('name', 'CHANGELLY_PRIVATE_KEY').maybeSingle()
      ]);
      
      if (publicKeyResult.data?.secret && privateKeyResult.data?.secret) {
        publicKey = publicKeyResult.data.secret.trim();
        privateKey = privateKeyResult.data.secret.trim();
        console.log('✅ Found individual API keys in vault');
      }
    }
  }

  // Final validation
  if (!publicKey || !privateKey) {
    throw new Error('No valid Changelly API keys found. Please add CHANGELLY_API_KEY_BASE64 (base64 encoded "public:private") or individual CHANGELLY_PUBLIC_KEY and CHANGELLY_PRIVATE_KEY to Supabase secrets');
  }

  console.log('🔑 API keys validated:');
  console.log('   - Public key length:', publicKey.length);
  console.log('   - Private key length:', privateKey.length);
  console.log('   - Public key preview:', publicKey.substring(0, 8) + '...');

  // Validate key formats
  if (publicKey.length < 8 || privateKey.length < 16) {
    throw new Error(`Invalid API key format - Keys seem too short - Public: ${publicKey.length} chars, Private: ${privateKey.length} chars`);
  }

  return { publicKey, privateKey };
}
