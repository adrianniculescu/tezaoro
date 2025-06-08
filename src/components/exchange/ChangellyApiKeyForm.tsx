
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key, ExternalLink, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ChangellyApiKeyForm = () => {
  const handleAddApiKey = () => {
    // This will trigger the Supabase secrets form for the base64 key
    console.log('Opening Changelly API Key Base64 form');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Changelly API Configuration
        </CardTitle>
        <CardDescription>
          Configure your Changelly API credentials to enable live exchange rates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            You can use either the Base64 encoded key (recommended) or individual public/private keys.
            The Base64 key should contain both keys separated by a colon, then base64 encoded.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/30">
            <h3 className="font-semibold mb-2">Option 1: Base64 Encoded Key (Recommended)</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Combine your public and private keys with a colon, then base64 encode the result.
              Format: <code>base64(public_key:private_key)</code>
            </p>
            <Button 
              onClick={handleAddApiKey}
              className="w-full"
              variant="default"
            >
              <Key className="h-4 w-4 mr-2" />
              Add CHANGELLY_API_KEY_BASE64
            </Button>
          </div>

          <div className="p-4 border rounded-lg bg-muted/10">
            <h3 className="font-semibold mb-2">Option 2: Individual Keys</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add your public and private keys separately (already configured if you've set them before).
            </p>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => console.log('Opening public key form')}
              >
                Add CHANGELLY_PUBLIC_KEY
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => console.log('Opening private key form')}
              >
                Add CHANGELLY_PRIVATE_KEY
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ExternalLink className="h-4 w-4" />
          <span>
            Get your API keys from{' '}
            <a 
              href="https://changelly.com/developers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Changelly Developers Portal
            </a>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChangellyApiKeyForm;
