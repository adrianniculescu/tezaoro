
import React from 'react';
import PageLayout from '@/components/PageLayout';
import GuideContent from '@/components/GuideContent';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const AccountSetup = () => {
  return (
    <PageLayout title="Account Setup">
      <GuideContent title="Account Setup">
        <div className="prose prose-invert max-w-none">
          <Alert className="bg-amber-500/10 border-amber-500/50 text-amber-200 mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Tezaoro is currently in MVP mode. The platform is open for customers by invitation only!
            </AlertDescription>
          </Alert>
          
          <h2>Getting Started with Your Tezaoro Account</h2>
          
          <p className="text-lg mb-6">
            <strong>Important Note:</strong> Tezaoro is currently in MVP phase and available by invitation only. 
            If you've received an invitation, follow these steps to set up your account.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Step 1: Account Activation</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Check your email for the invitation link from Tezaoro</li>
            <li>Click the secure activation link (valid for 48 hours)</li>
            <li>Create your unique username and strong password</li>
            <li>Verify your email address through the confirmation link</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Step 2: Security Settings</h3>
          <h4 className="text-lg font-medium mt-6 mb-3">Two-Factor Authentication (2FA)</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Enable 2FA using Google Authenticator or Authy</li>
            <li>Store your backup codes in a secure location</li>
            <li>Test your 2FA setup before proceeding</li>
          </ul>
          
          <h4 className="text-lg font-medium mt-6 mb-3">API Key Management</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Generate secure API keys for exchange connections</li>
            <li>Set appropriate permissions (read-only, trading, or full access)</li>
            <li>Configure IP whitelisting for enhanced security</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Step 3: Account Preferences</h3>
          <h4 className="text-lg font-medium mt-6 mb-3">Trading Preferences</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Set your default base currency (USD, EUR, BTC)</li>
            <li>Configure risk tolerance levels</li>
            <li>Choose notification preferences (email, SMS, in-app)</li>
          </ul>
          
          <h4 className="text-lg font-medium mt-6 mb-3">Dashboard Customization</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Arrange widgets according to your workflow</li>
            <li>Set up custom watchlists and alerts</li>
            <li>Configure chart layouts and timeframes</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Step 4: Verification Process</h3>
          <p>As we're in MVP phase, additional verification may be required:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Identity verification (KYC)</li>
            <li>Proof of trading experience</li>
            <li>Risk assessment questionnaire</li>
          </ul>
          
          <div className="border-t border-border mt-8 pt-8">
            <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
            <p>
              Once your account is set up, we recommend exploring the following guides:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><a href="/platform/platform-overview" className="text-primary hover:underline">Platform Overview</a> - Get familiar with the Tezaoro interface</li>
              <li><a href="/platform/deploying-first-algorithm" className="text-primary hover:underline">Deploying Your First Algorithm</a> - Start trading with your first algorithm</li>
            </ul>
            
            <p className="mt-8 text-muted-foreground">
              Need help? Contact our support team at <a href="mailto:office@tezaoro.com" className="text-primary">office@tezaoro.com</a>
            </p>
          </div>
        </div>
      </GuideContent>
    </PageLayout>
  );
};

export default AccountSetup;
