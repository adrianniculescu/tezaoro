
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Key, ExternalLink } from 'lucide-react';

const ChangellyApiKeyForm = () => {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!publicKey.trim() || !privateKey.trim()) {
      toast({
        title: "Missing Keys",
        description: "Please enter both public and private keys",
        variant: "destructive",
      });
      return;
    }

    // Check for placeholder text
    const placeholderPatterns = [
      'your_', 'placeholder', 'changelly_public_key', 'changelly_private_key',
      'your_actual_changelly', 'example_', 'demo_', 'test_key', 'sample_'
    ];
    
    const hasPlaceholderPublic = placeholderPatterns.some(pattern => 
      publicKey.toLowerCase().includes(pattern.toLowerCase())
    );
    const hasPlaceholderPrivate = placeholderPatterns.some(pattern => 
      privateKey.toLowerCase().includes(pattern.toLowerCase())
    );

    if (hasPlaceholderPublic || hasPlaceholderPrivate) {
      toast({
        title: "Placeholder Keys Detected",
        description: "Please enter your real Changelly SWAP API keys, not placeholder text",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create base64 encoded key pair
      const base64Keys = btoa(`${publicKey.trim()}:${privateKey.trim()}`);
      
      toast({
        title: "Keys Ready",
        description: `Please add this base64 value to your Supabase secrets as CHANGELLY_API_KEY_BASE64: ${base64Keys.substring(0, 20)}...`,
      });
      
      // Copy to clipboard
      navigator.clipboard.writeText(base64Keys);
      
      toast({
        title: "Copied to Clipboard",
        description: "The base64 encoded keys have been copied to your clipboard",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process API keys",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto mb-8 border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
      <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 mb-4">
        <AlertCircle className="h-5 w-5" />
        <h3 className="font-semibold">Update Changelly SWAP API Keys</h3>
      </div>
      
      <p className="text-sm text-orange-600 dark:text-orange-400 mb-4">
        Your current API keys appear to be placeholder values. Please enter your real Changelly SWAP API keys below.
      </p>

      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-2">
          <Key className="h-4 w-4" />
          <span className="font-medium">How to get your Changelly SWAP API keys:</span>
        </div>
        <ol className="text-sm text-blue-600 dark:text-blue-400 space-y-1 ml-6 list-decimal">
          <li>Go to <a href="https://changelly.com/business/exchange-api" target="_blank" rel="noopener noreferrer" className="underline inline-flex items-center gap-1">
            Changelly Business <ExternalLink className="h-3 w-3" />
          </a></li>
          <li>Sign up for the SWAP API service</li>
          <li>Navigate to API settings in your dashboard</li>
          <li>Generate new SWAP API keys</li>
          <li>Copy the real keys (not placeholder text)</li>
        </ol>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Public Key</label>
          <Input
            type="text"
            placeholder="Enter your Changelly SWAP public key"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            className="font-mono text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Private Key</label>
          <Input
            type="password"
            placeholder="Enter your Changelly SWAP private key"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            className="font-mono text-sm"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Processing...' : 'Generate Base64 Keys'}
        </Button>
      </form>

      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded text-xs text-gray-600 dark:text-gray-400">
        <strong>Next steps after clicking the button:</strong>
        <ol className="list-decimal ml-4 mt-1 space-y-1">
          <li>The base64 encoded keys will be copied to your clipboard</li>
          <li>Go to your Supabase project settings</li>
          <li>Navigate to Edge Functions → Secrets</li>
          <li>Update the CHANGELLY_API_KEY_BASE64 secret with the copied value</li>
          <li>Save the changes and test the API connection</li>
        </ol>
      </div>
    </Card>
  );
};

export default ChangellyApiKeyForm;
