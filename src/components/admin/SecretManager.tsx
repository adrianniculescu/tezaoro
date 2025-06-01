
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SecretManager = () => {
  const [secrets, setSecrets] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const requiredSecrets = [
    'CHANGELLY_PUBLIC_KEY',
    'CHANGELLY_PRIVATE_KEY',
    'CHANGELLY_API_KEY_BASE64'
  ];

  useEffect(() => {
    loadSecrets();
  }, []);

  const loadSecrets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vault')
        .select('name, secret')
        .in('name', requiredSecrets);

      if (error) {
        console.error('Error loading secrets:', error);
        toast({
          title: "Error",
          description: "Failed to load secrets",
          variant: "destructive",
        });
        return;
      }

      const secretsMap: Record<string, string> = {};
      data?.forEach(item => {
        secretsMap[item.name] = item.secret;
      });
      
      setSecrets(secretsMap);
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "Failed to connect to database",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSecret = async (name: string, value: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('vault')
        .upsert({ 
          name, 
          secret: value,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating secret:', error);
        toast({
          title: "Error",
          description: `Failed to update ${name}`,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `${name} updated successfully`,
      });

      // Reload secrets to confirm the update
      await loadSecrets();
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "Failed to update secret",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSecretChange = (name: string, value: string) => {
    setSecrets(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const testConnection = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('changelly-exchange', {
        body: {
          action: 'getCurrencies'
        }
      });

      if (error) {
        toast({
          title: "Connection Failed",
          description: error.message || "Failed to connect to Changelly API",
          variant: "destructive",
        });
        return;
      }

      if (data?.error) {
        toast({
          title: "API Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Successfully connected to Changelly API",
      });
    } catch (err) {
      console.error('Test connection error:', err);
      toast({
        title: "Test Failed",
        description: "Failed to test connection",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && Object.keys(secrets).length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center">Loading secrets...</div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Changelly API Configuration</h3>
      <div className="space-y-4">
        {requiredSecrets.map((secretName) => (
          <div key={secretName} className="space-y-2">
            <label className="text-sm font-medium">{secretName}</label>
            <div className="flex gap-2">
              <Input
                type="password"
                value={secrets[secretName] || ''}
                onChange={(e) => handleSecretChange(secretName, e.target.value)}
                placeholder={`Enter your ${secretName}`}
                className="flex-1"
              />
              <Button
                onClick={() => updateSecret(secretName, secrets[secretName] || '')}
                disabled={saving || !secrets[secretName]}
                variant="outline"
              >
                {saving ? 'Saving...' : 'Update'}
              </Button>
            </div>
            {secrets[secretName] && (
              <div className="text-xs text-muted-foreground">
                Current: {secrets[secretName].substring(0, 8)}...
                {secrets[secretName] === 'your_public_key_here' || secrets[secretName] === 'your_private_key_here' ? 
                  ' (⚠️ Placeholder value - needs real API key)' : 
                  ' (✓ Set)'
                }
              </div>
            )}
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button onClick={testConnection} disabled={loading} className="w-full">
            {loading ? 'Testing...' : 'Test Connection'}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground mt-4">
          <p><strong>Where to find your Changelly API keys:</strong></p>
          <p>1. CHANGELLY_PUBLIC_KEY: Your public API key from Changelly dashboard</p>
          <p>2. CHANGELLY_PRIVATE_KEY: Your private/secret key from Changelly dashboard</p>
          <p>3. CHANGELLY_API_KEY_BASE64: Base64 encoded version of "public_key:private_key"</p>
        </div>
      </div>
    </Card>
  );
};

export default SecretManager;
