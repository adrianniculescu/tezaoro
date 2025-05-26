
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Clock } from 'lucide-react';

const Contact = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:office@tezaoro.com';
  };

  return (
    <PageLayout title="Contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with the Tezaoro team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  For all inquiries, support requests, and business communications
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-lg font-semibold">office@tezaoro.com</p>
                </div>
                <Button onClick={handleEmailClick} className="w-full">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We aim to respond to all inquiries within:
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>General Inquiries:</span>
                    <span className="font-semibold">24-48 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Support Requests:</span>
                    <span className="font-semibold">12-24 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Business Partnerships:</span>
                    <span className="font-semibold">48-72 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                What can we help you with?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">Platform Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Technical issues, account problems, trading questions
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">Business Inquiries</h3>
                  <p className="text-sm text-muted-foreground">
                    Partnerships, enterprise solutions, custom algorithms
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">General Questions</h3>
                  <p className="text-sm text-muted-foreground">
                    Platform features, pricing, getting started guides
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12 p-6 bg-muted/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Need immediate assistance?</h3>
            <p className="text-muted-foreground mb-4">
              For urgent matters, please mark your email subject with [URGENT]
            </p>
            <Button variant="outline" onClick={handleEmailClick}>
              Contact Support Now
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
