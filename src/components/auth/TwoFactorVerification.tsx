
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TwoFactorVerificationProps {
  email: string;
  password: string;
  onBack: () => void;
  onSuccess: () => void;
}

const TwoFactorVerification = ({ email, password, onBack, onSuccess }: TwoFactorVerificationProps) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  const SUPABASE_URL = "https://tfzeegaepscycaaciviz.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmemVlZ2FlcHNjeWNhYWNpdml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MjY0NDAsImV4cCI6MjA2NDIwMjQ0MH0.GLFPR_AdtnruTpIXs_en5R1JLXML3avnqNEwJK6hUdM";

  const sendVerificationCode = async () => {
    setIsResending(true);
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/send-2fa-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code');
      }

      toast({
        title: "Verification code sent",
        description: "Please check your email for the 6-digit verification code.",
      });

      // In development, show the code
      if (data.code) {
        toast({
          title: "Development Mode",
          description: `Your verification code is: ${data.code}`,
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send verification code",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // First verify the 2FA code
      const verifyResponse = await fetch(`${SUPABASE_URL}/functions/v1/verify-2fa-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email, code }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || 'Failed to verify code');
      }

      if (!verifyData.valid) {
        toast({
          title: "Invalid code",
          description: "The verification code is invalid or has expired. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // If 2FA verification successful, proceed with sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        toast({
          title: "Error",
          description: signInError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
        });
        onSuccess();
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Send initial verification code when component mounts
  React.useEffect(() => {
    sendVerificationCode();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-6 glass-card bg-card">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-foreground">Two-Factor Authentication</h1>
          </div>
          <p className="text-muted-foreground">
            Enter the 6-digit verification code sent to your email
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {email}
          </p>
        </div>

        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              required
              disabled={isLoading}
              className="text-center text-lg tracking-widest"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || code.length !== 6}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </Button>
        </form>

        <div className="mt-4 space-y-2">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={sendVerificationCode}
            disabled={isResending}
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : (
              'Resend Code'
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={onBack}
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TwoFactorVerification;
