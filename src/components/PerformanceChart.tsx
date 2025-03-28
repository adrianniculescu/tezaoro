
import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const performanceData = {
  monthly: [
    { name: 'Jan', Algorithm: 4.2, 'S&P 500': 1.8 },
    { name: 'Feb', Algorithm: 2.5, 'S&P 500': -0.5 },
    { name: 'Mar', Algorithm: 5.1, 'S&P 500': 2.3 },
    { name: 'Apr', Algorithm: -1.2, 'S&P 500': -2.1 },
    { name: 'May', Algorithm: 3.8, 'S&P 500': 1.5 },
    { name: 'Jun', Algorithm: 7.2, 'S&P 500': 2.8 },
    { name: 'Jul', Algorithm: 2.9, 'S&P 500': 0.7 },
    { name: 'Aug', Algorithm: 6.4, 'S&P 500': 3.1 },
    { name: 'Sep', Algorithm: 4.7, 'S&P 500': 1.2 },
    { name: 'Oct', Algorithm: 8.3, 'S&P 500': 2.5 },
    { name: 'Nov', Algorithm: 5.6, 'S&P 500': 3.4 },
    { name: 'Dec', Algorithm: 7.9, 'S&P 500': 4.2 },
  ],
  yearly: [
    { name: '2017', Algorithm: 21.5, 'S&P 500': 18.4 },
    { name: '2018', Algorithm: 8.3, 'S&P 500': -4.4 },
    { name: '2019', Algorithm: 34.7, 'S&P 500': 28.9 },
    { name: '2020', Algorithm: 42.1, 'S&P 500': 16.3 },
    { name: '2021', Algorithm: 58.3, 'S&P 500': 26.9 },
    { name: '2022', Algorithm: 12.7, 'S&P 500': -19.4 },
    { name: '2023', Algorithm: 39.4, 'S&P 500': 24.2 },
  ],
};

const statistics = [
  { title: 'Win Rate', value: '72.4%' },
  { title: 'Risk-Adjusted Return', value: '3.7x' },
  { title: 'Max Drawdown', value: '8.2%' },
  { title: 'Sharpe Ratio', value: '2.54' },
];

const PerformanceChart = () => {
  return (
    <section id="performance" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Performance</span> Metrics
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our algorithms consistently outperform traditional market benchmarks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {statistics.map((stat, index) => (
            <Card key={index} className="p-6 glass-card bg-card">
              <h3 className="text-lg text-muted-foreground mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>
        
        <Card className="glass-card bg-card p-6">
          <Tabs defaultValue="monthly">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Return Comparison</h3>
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="monthly" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData.monthly}>
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
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="yearly" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData.yearly}>
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
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
};

export default PerformanceChart;
