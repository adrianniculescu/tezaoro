
import React, { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  TrendingUp, 
  Shield, 
  Users, 
  BarChart3, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Mail,
  Calendar
} from 'lucide-react';

const TokenomicsConsulting = () => {
  useEffect(() => {
    document.title = "Tokenomics Consulting for Crypto Projects | Tezaoro";
  }, []);

  const handleContactClick = () => {
    const subject = encodeURIComponent("Tokenomics Consulting Inquiry");
    const body = encodeURIComponent(
      "Hello Tezaoro team,\n\nI'm interested in your tokenomics consulting services for my crypto project.\n\nProject Details:\n- Project Name: \n- Stage: \n- Brief Description: \n\nI would like to schedule a free discovery call to discuss how you can help design our token economy.\n\nBest regards"
    );
    window.location.href = `mailto:office@tezaoro.com?subject=${subject}&body=${body}`;
  };

  return (
    <PageLayout title="Tokenomics Consulting">
      <PageHeader 
        title="Tokenomics Consulting for Crypto Projects"
        description="Unlock Sustainable Growth and Investor Confidence with Expert Tokenomics Design"
      />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-20">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            In the fast-evolving world of crypto, your token's economic model can make or break your project. 
            At Tezaoro, we offer specialized tokenomics consulting to help you design, implement, and optimize 
            a robust token economy—ensuring your project stands out, attracts investment, and thrives for the long term.
          </p>
        </div>

        {/* Why Tokenomics Matters */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why <span className="text-gradient">Tokenomics</span> Matters
          </h2>
          <Card className="glass-card">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Tokenomics is more than just numbers: it's the blueprint for your project's value, utility, and sustainability. 
                Effective tokenomics align the interests of founders, investors, and users, drive real demand, and create 
                lasting incentives for your ecosystem.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Approach */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Our <span className="text-gradient">Approach</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            We take a hands-on, data-driven approach to every project:
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="mb-4 bg-tezaoro-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-tezaoro-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Custom Token Model Design</h3>
                <p className="text-muted-foreground">
                  We craft bespoke tokenomics tailored to your goals, technology, and target audience—covering 
                  everything from utility and governance to staking, rewards, and deflationary mechanics.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="mb-4 bg-tezaoro-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-tezaoro-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Supply & Distribution Strategy</h3>
                <p className="text-muted-foreground">
                  We model optimal supply, emission schedules, vesting periods, and distribution plans to ensure 
                  fairness, transparency, and long-term commitment from all stakeholders.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="mb-4 bg-tezaoro-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-tezaoro-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Demand Drivers & Value Accrual</h3>
                <p className="text-muted-foreground">
                  We identify and engineer mechanisms that create ongoing demand for your token—such as staking, 
                  utility, burn programs, and exclusive platform benefits.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="mb-4 bg-tezaoro-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-tezaoro-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Incentive Alignment</h3>
                <p className="text-muted-foreground">
                  We structure incentives and rewards so that everyone—from early adopters to long-term holders—has 
                  a reason to participate and contribute.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="mb-4 bg-tezaoro-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-tezaoro-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Regulatory & Market Readiness</h3>
                <p className="text-muted-foreground">
                  We factor in best practices for compliance, security, and adaptability, helping you avoid 
                  common pitfalls and meet investor expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What We Deliver */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What We <span className="text-gradient">Deliver</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Comprehensive Tokenomics Blueprint</h3>
                    <p className="text-muted-foreground">
                      A clear, actionable document covering all aspects of your token economy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <BarChart3 className="h-5 w-5 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Scenario Analysis & Stress Testing</h3>
                    <p className="text-muted-foreground">
                      Financial modeling to test your tokenomics under different market conditions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Pitch Deck & Whitepaper Support</h3>
                    <p className="text-muted-foreground">
                      Clear, investor-ready explanations of your token model for fundraising and community building.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Ongoing Advisory</h3>
                    <p className="text-muted-foreground">
                      Post-launch support to monitor, optimize, and evolve your tokenomics as your project grows.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose Tezaoro */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose <span className="text-gradient">Tezaoro?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 bg-tezaoro-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-tezaoro-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Deep Industry Expertise</h3>
              <p className="text-muted-foreground">
                Our team combines experience in blockchain, economics, and venture building.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 bg-tezaoro-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-8 w-8 text-tezaoro-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tailored, Transparent Process</h3>
              <p className="text-muted-foreground">
                Every engagement is customized; we work closely with your team at every step.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 bg-tezaoro-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-tezaoro-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Proven Results</h3>
              <p className="text-muted-foreground">
                We've helped projects achieve sustainable growth, investor trust, and strong community engagement.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-card bg-gradient-to-r from-tezaoro-900/20 to-tezaoro-700/20 border-tezaoro-500/30">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Build a Token Economy That <span className="text-gradient">Lasts?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Contact us today to schedule your free discovery call and see how Tezaoro can help you create 
                a tokenomics model that fuels adoption, growth, and long-term value.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-tezaoro-500 hover:bg-tezaoro-600 text-white"
                  onClick={handleContactClick}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Schedule Free Discovery Call
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleContactClick}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Get Consultation
                </Button>
              </div>
              <p className="text-lg font-semibold mt-8 text-gradient">
                Tezaoro – Where Vision Meets Viable Tokenomics
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default TokenomicsConsulting;
