
export async function createHmacSignature(message: string, privateKey: string): Promise<string> {
  console.log('🔐 Creating HMAC-SHA512 signature...');
  
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(privateKey);
    const messageData = encoder.encode(message);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-512' },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    const signatureHex = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    console.log('✅ HMAC-SHA512 signature created successfully');
    console.log('🔐 Signature length:', signatureHex.length);
    console.log('🔐 Signature preview:', signatureHex.substring(0, 16) + '...');
    
    return signatureHex;
  } catch (cryptoError) {
    console.error('❌ Signature creation error:', cryptoError);
    throw new Error(`Failed to create request signature: ${cryptoError.message}`);
  }
}
