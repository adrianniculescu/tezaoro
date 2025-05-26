
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <PageLayout title="Terms of Service">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              Last updated: December 2023
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p>By accessing and using Tezaoro's algorithmic trading platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Description of Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Tezaoro provides an AI-powered algorithmic trading platform for cryptocurrency markets, specifically focusing on nano-cap cryptocurrencies. Our services include trading algorithms, performance analytics, and market-making solutions.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>As a user of our platform, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and current information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Not use the service for any illegal or unauthorized purpose</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Trading Risks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-semibold text-yellow-600">WARNING: Trading cryptocurrencies involves substantial risk of loss.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Past performance does not guarantee future results</li>
                  <li>Algorithmic trading may result in significant losses</li>
                  <li>Market conditions can change rapidly</li>
                  <li>You should only trade with funds you can afford to lose</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Tezaoro shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use of our platform. We do not guarantee profits or protection against losses.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Service Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p>We strive to maintain high service availability but do not guarantee uninterrupted access. Maintenance, updates, or technical issues may temporarily affect service availability.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p>All content, algorithms, and software provided by Tezaoro are protected by intellectual property laws. Users may not copy, modify, or distribute our proprietary technology.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <p>We reserve the right to terminate or suspend accounts that violate these terms or engage in suspicious activity. Users may terminate their accounts at any time.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p>We reserve the right to modify these terms at any time. Users will be notified of significant changes and continued use constitutes acceptance of modified terms.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>For questions about these Terms of Service, please contact us at:</p>
                <p className="mt-2">
                  <a href="mailto:office@tezaoro.com" className="text-primary hover:underline">
                    office@tezaoro.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsOfService;
