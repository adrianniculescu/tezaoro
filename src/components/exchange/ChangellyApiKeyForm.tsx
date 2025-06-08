
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key, ExternalLink, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ChangellyApiKeyForm = () => {
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
            <div className="bg-slate-100 p-3 rounded text-sm mb-3">
              <strong>How to create the Base64 key:</strong><br/>
              1. Copy your Changelly public key<br/>
              2. Add a colon (:)<br/>
              3. Add your Changelly private key<br/>
              4. Use any Base64 encoder (like base64encode.org) to encode the combined string<br/>
              Example: If public key is "abc123" and private key is "xyz789", combine as "abc123:xyz789" then base64 encode it.
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-muted/10">
            <h3 className="font-semibold mb-2">Option 2: Individual Keys</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add your public and private keys separately.
            </p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-700 mb-2">
            <Key className="h-4 w-4" />
            <span className="font-medium">API Keys Configured</span>
          </div>
          <p className="text-sm text-green-600">
            Your Changelly API keys have been successfully added to the system. 
            You can now use the Exchange page to get live cryptocurrency rates.
          </p>
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
