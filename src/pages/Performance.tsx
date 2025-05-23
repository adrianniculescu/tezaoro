import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertTriangle, HelpCircle, ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';

const Performance = () => {
  const monthlyPerformance = [
    { name: 'Jan', Algorithm: 4.2, 'S&P 500': 1.8, 'Bitcoin': 5.9 },
    { name: 'Feb', Algorithm: 2.5, 'S&P 500': -0.5, 'Bitcoin': -2.1 },
    { name: 'Mar', Algorithm: 5.1, 'S&P 500': 2.3, 'Bitcoin': 7.2 },
    { name: 'Apr', Algorithm: -1.2, 'S&P 500': -2.1, 'Bitcoin': -3.5 },
    { name: 'May', Algorithm: 3.8, 'S&P 500': 1.5, 'Bitcoin': 4.1 },
    { name: 'Jun', Algorithm: 7.2, 'S&P 500': 2.8, 'Bitcoin': 10.3 },
    { name: 'Jul', Algorithm: 2.9, 'S&P 500': 0.7, 'Bitcoin': -1.8 },
    { name: 'Aug', Algorithm: 6.4, 'S&P 500': 3.1, 'Bitcoin': 8.7 },
    { name: 'Sep', Algorithm: 4.7, 'S&P 500': 1.2, 'Bitcoin': 2.9 },
    { name: 'Oct', Algorithm: 8.3, 'S&P 500': 2.5, 'Bitcoin': 6.5 },
    { name: 'Nov', Algorithm: 5.6, 'S&P 500': 3.4, 'Bitcoin': 4.8 },
    { name: 'Dec', Algorithm: 7.9, 'S&P 500': 4.2, 'Bitcoin': 9.2 },
  ];
  
  const yearlyPerformance = [
    { name: '2017', Algorithm: 21.5, 'S&P 500': 18.4, 'Bitcoin': 1337.8 },
    { name: '2018', Algorithm: 8.3, 'S&P 500': -4.4, 'Bitcoin': -72.6 },
    { name: '2019', Algorithm: 34.7, 'S&P 500': 28.9, 'Bitcoin': 87.2 },
    { name: '2020', Algorithm: 42.1, 'S&P 500': 16.3, 'Bitcoin': 302.8 },
    { name: '2021', Algorithm: 58.3, 'S&P 500': 26.9, 'Bitcoin': 59.8 },
    { name: '2022', Algorithm: 12.7, 'S&P 500': -19.4, 'Bitcoin': -64.3 },
    { name: '2023', Algorithm: 39.4, 'S&P 500': 24.2, 'Bitcoin': 154.2 },
  ];
  
  const riskMetrics = [
    { name: 'Max Drawdown', Algorithm: 8.2, 'S&P 500': 23.6, 'Bitcoin': 71.4 },
    { name: 'Volatility', Algorithm: 12.4, 'S&P 500': 16.8, 'Bitcoin': 54.7 },
    { name: 'Sharpe Ratio', Algorithm: 2.54, 'S&P 500': 1.21, 'Bitcoin': 1.87 },
    { name: 'Sortino Ratio', Algorithm: 3.76, 'S&P 500': 1.58, 'Bitcoin': 2.13 },
    { name: 'Win Rate', Algorithm: 72.4, 'S&P 500': 58.3, 'Bitcoin': 56.2 },
  ];
  
  const keyMetrics = [
    { title: 'Annualized Return', value: '32.6%' },
    { title: 'Win Rate', value: '72.4%' },
    { title: 'Risk-Adjusted Return', value: '3.7x' },
    { title: 'Max Drawdown', value: '8.2%' },
    { title: 'Sharpe Ratio', value: '2.54' },
    { title: 'Recovery Time', value: '21 days' },
  ];
  
  const performanceGuides = [
    {
      title: "Performance Metrics Explained",
      description: "Learn about the key metrics used to evaluate algorithm performance and what they mean.",
      url: "/performance/metrics-explained"
    },
    {
      title: "Performance Dashboard Guide",
      description: "How to use and customize the performance dashboard to monitor your algorithms.",
      url: "/performance/dashboard-guide"
    },
    {
      title: "Reporting Features",
      description: "Generate, customize, and share performance reports for your algorithms.",
      url: "/performance/reporting-features"
    },
    {
      title: "Optimization Techniques",
      description: "Strategies for improving algorithm performance based on historical data.",
      url: "/performance/optimization-techniques"
    }
  ];
  
  return (
    <PageLayout title="Performance">
      <PageHeader 
        title="Performance Metrics" 
        description="Transparent reporting on our algorithmic trading performance"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="bg-amber-500/10 border-amber-500/50 text-amber-200 max-w-5xl mx-auto mb-10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              The performance data shown represents backtested and simulated trading results. Past performance does not guarantee future results.
              Actual trading may result in different outcomes based on market conditions and other factors.
            </AlertDescription>
          </Alert>
          
          {/* Performance guides section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Performance <span className="text-gradient">Guides</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceGuides.map((guide, index) => (
                <Card key={index} className="glass-card bg-card p-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">{guide.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {guide.description}
                  </p>
                  
                  <Link to={guide.url}>
                    <Button variant="outline" className="w-full flex items-center justify-between">
                      <span>Read guide</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="p-6 glass-card bg-card">
                <h3 className="text-lg text-muted-foreground mb-2 flex items-center gap-2">
                  {metric.title}
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64">Performance metric based on historical data since inception.</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </h3>
                <p className="text-3xl font-bold">{metric.value}</p>
              </Card>
            ))}
          </div>
          
          <Tabs defaultValue="monthly" className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Return Comparison</h3>
              <TabsList>
                <TabsTrigger value="monthly">Monthly (Last 12 Months)</TabsTrigger>
                <TabsTrigger value="yearly">Annual Performance</TabsTrigger>
              </TabsList>
            </div>
            
            <Card className="glass-card bg-card p-6">
              <TabsContent value="monthly" className="h-[400px] mt-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" tickFormatter={(value) => `${value}%`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(22, 27, 34, 0.9)', 
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white'
                      }}
                      formatter={(value) => [`${value}%`]}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="Algorithm" 
                      stroke="#0ba5ec" 
                      strokeWidth={3} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="S&P 500" 
                      stroke="#8884d8" 
                      strokeWidth={2} 
                      dot={{ r: 3 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Bitcoin" 
                      stroke="#ffc658" 
                      strokeWidth={2} 
                      dot={{ r: 3 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="yearly" className="h-[400px] mt-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" tickFormatter={(value) => `${value}%`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(22, 27, 34, 0.9)', 
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white'
                      }}
                      formatter={(value) => [`${value}%`]}
                    />
                    <Legend />
                    <Bar dataKey="Algorithm" fill="#0ba5ec" />
                    <Bar dataKey="S&P 500" fill="#8884d8" />
                    <Bar dataKey="Bitcoin" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Card>
          </Tabs>
          
          <h3 className="text-2xl font-bold mb-6">Risk Metrics Comparison</h3>
          <Card className="glass-card bg-card p-6 mb-16">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={riskMetrics}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.5)" width={120} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(22, 27, 34, 0.9)', 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Algorithm" fill="#0ba5ec" />
                  <Bar dataKey="S&P 500" fill="#8884d8" />
                  <Bar dataKey="Bitcoin" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <h3 className="text-2xl font-bold mb-6">Cumulative Returns</h3>
          <Card className="glass-card bg-card p-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { month: 'Jan 2023', Algorithm: 100, 'S&P 500': 100, 'Bitcoin': 100 },
                    { month: 'Feb 2023', Algorithm: 102.5, 'S&P 500': 99.5, 'Bitcoin': 97.9 },
                    { month: 'Mar 2023', Algorithm: 107.7, 'S&P 500': 101.8, 'Bitcoin': 105.0 },
                    { month: 'Apr 2023', Algorithm: 106.4, 'S&P 500': 99.7, 'Bitcoin': 101.3 },
                    { month: 'May 2023', Algorithm: 110.5, 'S&P 500': 101.2, 'Bitcoin': 105.4 },
                    { month: 'Jun 2023', Algorithm: 118.5, 'S&P 500': 104.0, 'Bitcoin': 116.3 },
                    { month: 'Jul 2023', Algorithm: 122.0, 'S&P 500': 104.7, 'Bitcoin': 114.2 },
                    { month: 'Aug 2023', Algorithm: 129.8, 'S&P 500': 108.0, 'Bitcoin': 124.1 },
                    { month: 'Sep 2023', Algorithm: 135.9, 'S&P 500': 109.3, 'Bitcoin': 127.7 },
                    { month: 'Oct 2023', Algorithm: 147.2, 'S&P 500': 112.0, 'Bitcoin': 136.0 },
                    { month: 'Nov 2023', Algorithm: 155.4, 'S&P 500': 115.8, 'Bitcoin': 142.5 },
                    { month: 'Dec 2023', Algorithm: 167.7, 'S&P 500': 120.7, 'Bitcoin': 155.6 },
                    { month: 'Jan 2024', Algorithm: 174.8, 'S&P 500': 122.9, 'Bitcoin': 164.8 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(22, 27, 34, 0.9)', 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white'
                    }}
                    formatter={(value) => [`${value} (indexed)`]}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="Algorithm" 
                    stroke="#0ba5ec" 
                    fill="#0ba5ec" 
                    fillOpacity={0.2} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="S&P 500" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.2} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Bitcoin" 
                    stroke="#ffc658" 
                    fill="#ffc658" 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Performance <span className="text-gradient">Transparency</span></h2>
          <p className="text-lg text-muted-foreground mb-8">
            At Tezaoro, we believe in complete transparency regarding our performance metrics. 
            Once we launch, all subscribers will have access to detailed performance reports, 
            trade logs, and backtest results for each algorithm.
          </p>
          <div className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md cursor-not-allowed opacity-70">
            Request Detailed Metrics (Coming Soon)
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Performance;
