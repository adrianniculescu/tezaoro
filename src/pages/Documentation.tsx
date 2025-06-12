import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { FileText, Search, ArrowRight, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Documentation = () => {
  return (
    <PageLayout title="Documentation">
      <PageHeader 
        title="Platform Documentation" 
        description="Comprehensive guides to help you get the most out of Tezaoro"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                className="pl-10 bg-card" 
                placeholder="Search documentation..." 
                disabled={true}
              />
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Getting <span className="text-gradient">Started</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Platform Overview</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Get familiar with the Tezaoro platform interface and key features.
                </p>
                <Button variant="link" className="p-0 h-auto flex items-center gap-1" disabled={true}>
                  <span>in development</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Card>
              
              <Card className="glass-card bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Account Setup</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Learn how to set up your account, security settings, and preferences.
                </p>
                <Button variant="link" className="p-0 h-auto flex items-center gap-1" disabled={true}>
                  <span>in development</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Card>
              
              <Card className="glass-card bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Deploying Your First Algorithm</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  A step-by-step guide to selecting and deploying your first trading algorithm.
                </p>
                <Button variant="link" className="p-0 h-auto flex items-center gap-1" disabled={true}>
                  <span>in development</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Card>
            </div>
          </div>
          
          
          <div className="mb-16">
            <Tabs defaultValue="algorithms" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-card">
                  <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="account">Account & Settings</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="algorithms">
                <Card className="glass-card bg-card p-8">
                  <h3 className="text-xl font-bold mb-6">Algorithm Documentation</h3>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Algorithm Selection Guide</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Detailed information on how to select the right algorithms based on your trading style, 
                          risk tolerance, and financial goals.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Algorithm Parameters</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Learn how to customize algorithm parameters to fine-tune performance and risk management.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Backtesting Guide</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Comprehensive guide to testing algorithms against historical data to evaluate performance.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Real-time Trading</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Instructions for deploying algorithms in live trading environments with proper risk controls.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Algorithm Index</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Detailed documentation for each algorithm available on the Tezaoro platform.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Index (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </TabsContent>
              
              <TabsContent value="performance">
                <Card className="glass-card bg-card p-8">
                  <h3 className="text-xl font-bold mb-6">Performance Tracking Documentation</h3>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Performance Metrics Explained</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Detailed explanations of all performance metrics used on the platform, including Sharpe ratio, 
                          drawdown, win rate, and more.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Performance Dashboard Guide</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          How to use the performance dashboard to monitor your algorithms and trading results.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Reporting Features</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Guide to generating and interpreting performance reports for your trading activities.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Optimization Techniques</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Strategies for optimizing algorithm performance based on historical results.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </TabsContent>
              
              <TabsContent value="account">
                <Card className="glass-card bg-card p-8">
                  <h3 className="text-xl font-bold mb-6">Account & Settings Documentation</h3>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Account Management</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          How to manage your account details, subscription, and billing information.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Security Settings</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Best practices for securing your account with two-factor authentication and other security features.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Notification Preferences</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Configure alerts and notifications for trading activities, performance milestones, and system updates.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>User Permissions</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Managing team access and permissions for enterprise accounts.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </TabsContent>
              
              <TabsContent value="api">
                <Card className="glass-card bg-card p-8">
                  <h3 className="text-xl font-bold mb-6">API Documentation</h3>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>API Overview</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Introduction to the Tezaoro API, available endpoints, and authentication.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Authentication</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Detailed guide on API keys, OAuth, and securing your API connections.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Algorithm Endpoints</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          API endpoints for deploying, monitoring, and managing algorithms programmatically.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Data Endpoints</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Accessing market data, historical prices, and performance metrics via API.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Guide (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Code Examples</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-4">
                          Sample code in Python, JavaScript, and other languages for common API operations.
                        </p>
                        <Button variant="outline" className="mt-2" disabled={true}>View Examples (Coming Soon)</Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-bold mb-6">Can't find what you're looking for?</h3>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="outline" className="flex items-center gap-2" disabled={true}>
                <Search className="h-4 w-4" />
                <span>Search Documentation</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2" disabled={true}>
                <Bookmark className="h-4 w-4" />
                <span>Check Support Portal</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6"><span className="text-gradient">Complete</span> Documentation</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our full documentation is currently under development and will be available when Tezaoro launches.
            This will include comprehensive guides, API references, and learning resources.
          </p>
          <div className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md cursor-not-allowed opacity-70">
            Join Waitlist (Coming Soon)
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Documentation;
