
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Code, Server, Key, Database, AlertTriangle, 
  PackageCheck, AlertCircle, Globe, Clock, Shield
} from 'lucide-react';
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

interface ApiEndpointProps {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  description: string;
}

const ApiEndpoint = ({ name, method, endpoint, description }: ApiEndpointProps) => {
  const methodColors = {
    GET: 'bg-green-500/20 text-green-500',
    POST: 'bg-blue-500/20 text-blue-500',
    PUT: 'bg-yellow-500/20 text-yellow-500',
    DELETE: 'bg-red-500/20 text-red-500'
  };
  
  return (
    <div className="border border-muted rounded-lg p-4 mb-4">
      <div className="flex items-start flex-wrap gap-3 mb-3">
        <span className={`text-xs font-mono font-bold py-1 px-2 rounded ${methodColors[method]}`}>
          {method}
        </span>
        <span className="text-base font-semibold">{name}</span>
      </div>
      <code className="block bg-background p-2 rounded text-sm font-mono mb-3">
        {endpoint}
      </code>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

const CodeBlock = ({ language, code }: { language: string; code: string }) => (
  <pre className="bg-background p-4 rounded-lg overflow-x-auto mb-4">
    <code className="text-sm font-mono whitespace-pre text-muted-foreground">
      {code}
    </code>
  </pre>
);

const Api = () => {
  return (
    <PageLayout title="API Documentation">
      <PageHeader 
        title="API Reference" 
        description="Integrate Tezaoro's powerful algorithmic trading capabilities into your applications"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="bg-amber-500/10 border-amber-500/50 text-amber-200 max-w-3xl mx-auto mb-10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Tezaoro API is currently in development and will be available when we launch.
              This documentation is for preview purposes only.
            </AlertDescription>
          </Alert>
          
          <div className="max-w-5xl mx-auto">
            <Card className="glass-card bg-card p-8 mb-12">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mb-6">
                    <Server className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">API Overview</h3>
                  <p className="text-muted-foreground mb-4">
                    The Tezaoro API provides programmatic access to our algorithmic trading platform, allowing you to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <PackageCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Deploy and manage trading algorithms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Database className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Access market data and analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Globe className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Monitor performance in real-time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Set risk parameters and limits</span>
                    </li>
                  </ul>
                </div>
                
                <div className="md:w-2/3">
                  <h4 className="text-xl font-semibold mb-4">Getting Started</h4>
                  <p className="text-muted-foreground mb-4">
                    To use the Tezaoro API, you'll need an API key that will be available in your dashboard once we launch.
                    All API requests must be made over HTTPS and include authentication headers.
                  </p>
                  
                  <h4 className="text-xl font-semibold mb-4">Base URL</h4>
                  <CodeBlock 
                    language="plaintext" 
                    code="https://api.tezaoro.com/v1" 
                  />
                  
                  <h4 className="text-xl font-semibold mb-4">Authentication</h4>
                  <p className="text-muted-foreground mb-4">
                    Authentication is performed using API keys. Include your API key in the Authorization header:
                  </p>
                  <CodeBlock 
                    language="plaintext" 
                    code='Authorization: Bearer YOUR_API_KEY' 
                  />
                  
                  <div className="bg-background/40 p-6 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-accent" />
                      <h4 className="text-lg font-semibold">Security Notice</h4>
                    </div>
                    <p className="text-muted-foreground">
                      Never share your API keys or include them in client-side code. 
                      Always make API requests from a secure backend server.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Tabs defaultValue="algorithms" className="mb-12">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-card">
                  <TabsTrigger value="algorithms">Algorithm Endpoints</TabsTrigger>
                  <TabsTrigger value="market">Market Data</TabsTrigger>
                  <TabsTrigger value="user">User & Account</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="algorithms">
                <Card className="glass-card bg-card p-8">
                  <h3 className="text-xl font-bold mb-6">Algorithm API Endpoints</h3>
                  
                  <ApiEndpoint
                    name="List Algorithms"
                    method="GET"
                    endpoint="/algorithms"
                    description="Returns a list of all available trading algorithms with their details and parameters."
                  />
                  
                  <ApiEndpoint
                    name="Get Algorithm Details"
                    method="GET"
                    endpoint="/algorithms/{algorithm_id}"
                    description="Returns detailed information about a specific algorithm, including parameters, performance metrics, and requirements."
                  />
                  
                  <ApiEndpoint
                    name="Deploy Algorithm"
                    method="POST"
                    endpoint="/algorithms/{algorithm_id}/deploy"
                    description="Deploys an algorithm with specified parameters and settings. Returns a deployment ID for tracking."
                  />
                  
                  <ApiEndpoint
                    name="Update Algorithm Parameters"
                    method="PUT"
                    endpoint="/algorithms/{algorithm_id}/deployments/{deployment_id}"
                    description="Updates the parameters of a currently deployed algorithm without stopping it."
                  />
                  
                  <ApiEndpoint
                    name="Stop Algorithm"
                    method="POST"
                    endpoint="/algorithms/{algorithm_id}/deployments/{deployment_id}/stop"
                    description="Stops a currently running algorithm deployment."
                  />
                  
                  <ApiEndpoint
                    name="Algorithm Performance"
                    method="GET"
                    endpoint="/algorithms/{algorithm_id}/deployments/{deployment_id}/performance"
                    description="Returns performance metrics for a specific algorithm deployment, including returns, drawdowns, and trade history."
                  />
                  
                  <h4 className="text-lg font-semibold my-6">Example: Deploying an Algorithm</h4>
                  <CodeBlock 
                    language="javascript" 
                    code={`// Request
POST /algorithms/momentum-alpha/deploy
{
  "capital_allocation": 10000,
  "risk_level": "medium",
  "markets": ["BTC-USD", "ETH-USD"],
  "timeframe": "4h",
  "take_profit": 5.0,
  "stop_loss": 2.0
}

// Response
{
  "status": "success",
  "deployment_id": "dep_12345",
  "message": "Algorithm deployed successfully",
  "estimated_start_time": "2024-06-15T10:30:00Z"
}`} 
                  />
                </Card>
              </TabsContent>
              
              <TabsContent value="market">
                <Card className="glass-card bg-card p-8">
                  <h3 className="text-xl font-bold mb-6">Market Data API Endpoints</h3>
                  
                  <ApiEndpoint
                    name="Market Summary"
                    method="GET"
                    endpoint="/markets/summary"
                    description="Returns an overview of current market conditions, including major indices, cryptocurrency markets, and forex."
                  />
                  
                  <ApiEndpoint
                    name="Asset Price Data"
                    method="GET"
                    endpoint="/markets/prices/{symbol}"
                    description="Returns current and historical price data for a specific asset or trading pair."
                  />
                  
                  <ApiEndpoint
                    name="Market Indicators"
                    method="GET"
                    endpoint="/markets/indicators/{symbol}"
                    description="Returns technical indicators like RSI, MACD, and moving averages for a specific asset."
                  />
                  
                  <ApiEndpoint
                    name="Market Sentiment"
                    method="GET"
                    endpoint="/markets/sentiment/{symbol}"
                    description="Returns market sentiment analysis for a specific asset, including social media and news sentiment."
                  />
                  
                  <ApiEndpoint
                    name="Market Events"
                    method="GET"
                    endpoint="/markets/events"
                    description="Returns upcoming market events like economic releases, earnings reports, and central bank announcements."
                  />
                  
                  <h4 className="text-lg font-semibold my-6">Example: Fetching Historical Price Data</h4>
                  <CodeBlock 
                    language="javascript" 
                    code={`// Request
GET /markets/prices/BTC-USD?timeframe=1d&start=2023-01-01&end=2023-01-31

// Response
{
  "symbol": "BTC-USD",
  "timeframe": "1d",
  "data": [
    {
      "timestamp": "2023-01-01T00:00:00Z",
      "open": 16547.50,
      "high": 16712.25,
      "low": 16485.80,
      "close": 16625.40,
      "volume": 24150.76
    },
    // Additional data points...
  ]
}`} 
                  />
                </Card>
              </TabsContent>
              
              <TabsContent value="user">
                <Card className="glass-card bg-card p-8">
                  <h3 className="text-xl font-bold mb-6">User & Account API Endpoints</h3>
                  
                  <ApiEndpoint
                    name="Account Information"
                    method="GET"
                    endpoint="/account"
                    description="Returns details about the user's account, including subscription status, permissions, and limits."
                  />
                  
                  <ApiEndpoint
                    name="API Keys"
                    method="GET"
                    endpoint="/account/api-keys"
                    description="Lists all API keys associated with the account (excluding the key values themselves)."
                  />
                  
                  <ApiEndpoint
                    name="Create API Key"
                    method="POST"
                    endpoint="/account/api-keys"
                    description="Creates a new API key with specified permissions and returns the key value (shown only once)."
                  />
                  
                  <ApiEndpoint
                    name="Revoke API Key"
                    method="DELETE"
                    endpoint="/account/api-keys/{key_id}"
                    description="Revokes and deletes an API key, making it immediately invalid for future requests."
                  />
                  
                  <ApiEndpoint
                    name="Usage Statistics"
                    method="GET"
                    endpoint="/account/usage"
                    description="Returns API usage statistics and limits for the current account."
                  />
                  
                  <ApiEndpoint
                    name="Deployed Algorithms"
                    method="GET"
                    endpoint="/account/deployments"
                    description="Lists all currently deployed algorithms for the account with their status and performance summary."
                  />
                  
                  <h4 className="text-lg font-semibold my-6">Example: Creating a New API Key</h4>
                  <CodeBlock 
                    language="javascript" 
                    code={`// Request
POST /account/api-keys
{
  "name": "Trading Bot Integration",
  "permissions": ["read", "algorithm_deploy"],
  "expires_in_days": 90
}

// Response
{
  "status": "success",
  "key_id": "key_67890",
  "api_key": "tz_B1xJ2K3L4M5N6P7Q8R9S0T1U2V3W4X5Y6Z7",
  "name": "Trading Bot Integration",
  "permissions": ["read", "algorithm_deploy"],
  "created_at": "2024-06-15T09:24:35Z",
  "expires_at": "2024-09-13T09:24:35Z",
  "warning": "This API key will only be shown once. Please store it securely."
}`} 
                  />
                </Card>
              </TabsContent>
            </Tabs>
            
            <Card className="glass-card bg-card p-8 mb-12">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mb-6">
                    <Code className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Code Examples</h3>
                  <p className="text-muted-foreground mb-4">
                    The following examples demonstrate how to use the Tezaoro API with different programming languages.
                  </p>
                </div>
                
                <div className="md:w-2/3">
                  <Tabs defaultValue="python">
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="python" className="flex-1">Python</TabsTrigger>
                      <TabsTrigger value="javascript" className="flex-1">JavaScript</TabsTrigger>
                      <TabsTrigger value="go" className="flex-1">Go</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="python">
                      <h4 className="text-lg font-semibold mb-4">Deploying an Algorithm in Python</h4>
                      <CodeBlock 
                        language="python" 
                        code={`import requests
import json

API_KEY = "your_api_key_here"
BASE_URL = "https://api.tezaoro.com/v1"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# Deploy the Momentum Alpha algorithm
algorithm_id = "momentum-alpha"
payload = {
    "capital_allocation": 10000,
    "risk_level": "medium",
    "markets": ["BTC-USD", "ETH-USD"],
    "timeframe": "4h",
    "take_profit": 5.0,
    "stop_loss": 2.0
}

response = requests.post(
    f"{BASE_URL}/algorithms/{algorithm_id}/deploy",
    headers=headers,
    data=json.dumps(payload)
)

if response.status_code == 200:
    result = response.json()
    deployment_id = result["deployment_id"]
    print(f"Algorithm deployed successfully. Deployment ID: {deployment_id}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)`} 
                      />
                    </TabsContent>
                    
                    <TabsContent value="javascript">
                      <h4 className="text-lg font-semibold mb-4">Fetching Market Data in JavaScript</h4>
                      <CodeBlock 
                        language="javascript" 
                        code={`// Using Node.js with axios
const axios = require('axios');

const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.tezaoro.com/v1';

// Function to get historical price data
async function getHistoricalPrices(symbol, timeframe, startDate, endDate) {
  try {
    const response = await axios.get(
      \`\${BASE_URL}/markets/prices/\${symbol}\`,
      {
        headers: { Authorization: \`Bearer \${API_KEY}\` },
        params: {
          timeframe,
          start: startDate,
          end: endDate
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching price data:', error.response?.data || error.message);
    throw error;
  }
}

// Example usage
getHistoricalPrices('BTC-USD', '1d', '2023-01-01', '2023-01-31')
  .then(data => {
    console.log(\`Retrieved \${data.data.length} price points for \${data.symbol}\`);
    // Process the data...
  })
  .catch(error => {
    console.error('Failed to retrieve price data');
  });`} 
                      />
                    </TabsContent>
                    
                    <TabsContent value="go">
                      <h4 className="text-lg font-semibold mb-4">Managing API Keys in Go</h4>
                      <CodeBlock 
                        language="go" 
                        code={`package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

const (
	BaseURL = "https://api.tezaoro.com/v1"
	ApiKey  = "your_api_key_here"
)

type APIKeyRequest struct {
	Name           string   \`json:"name"\`
	Permissions    []string \`json:"permissions"\`
	ExpiresInDays  int      \`json:"expires_in_days"\`
}

type APIKeyResponse struct {
	Status    string   \`json:"status"\`
	KeyID     string   \`json:"key_id"\`
	APIKey    string   \`json:"api_key"\`
	Name      string   \`json:"name"\`
	CreatedAt string   \`json:"created_at"\`
	ExpiresAt string   \`json:"expires_at"\`
	Warning   string   \`json:"warning"\`
}

func createAPIKey(name string, permissions []string, expiresInDays int) (*APIKeyResponse, error) {
	req := APIKeyRequest{
		Name:          name,
		Permissions:   permissions,
		ExpiresInDays: expiresInDays,
	}
	
	jsonData, err := json.Marshal(req)
	if err != nil {
		return nil, err
	}
	
	request, err := http.NewRequest("POST", BaseURL+"/account/api-keys", bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, err
	}
	
	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+ApiKey)
	
	client := &http.Client{}
	resp, err := client.Do(request)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed: %s", body)
	}
	
	var result APIKeyResponse
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}
	
	return &result, nil
}

func main() {
	permissions := []string{"read", "algorithm_deploy"}
	keyResponse, err := createAPIKey("Trading Integration", permissions, 90)
	
	if err != nil {
		fmt.Printf("Error creating API key: %v\n", err)
		return
	}
	
	fmt.Printf("API Key created successfully: %s\n", keyResponse.KeyID)
	fmt.Printf("Key: %s\n", keyResponse.APIKey)
	fmt.Printf("Warning: %s\n", keyResponse.Warning)
}`} 
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </Card>
            
            <div className="bg-card/50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">API Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                    <h4 className="text-lg font-semibold">Rate Limits</h4>
                  </div>
                  <p className="text-muted-foreground">
                    Standard accounts: 60 requests per minute<br />
                    Professional accounts: 300 requests per minute<br />
                    Enterprise accounts: Custom limits
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                    <h4 className="text-lg font-semibold">Security</h4>
                  </div>
                  <p className="text-muted-foreground">
                    All API requests must use HTTPS<br />
                    API keys are required for authentication<br />
                    IP whitelisting available for Enterprise accounts
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Key className="h-6 w-6 text-primary" />
                    <h4 className="text-lg font-semibold">API Access</h4>
                  </div>
                  <p className="text-muted-foreground">
                    Available to Professional and Enterprise plans<br />
                    Custom endpoint access for Enterprise customers<br />
                    Webhooks for real-time event notifications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to <span className="text-gradient">Integrate</span>?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our API will be available when Tezaoro launches. Join our waitlist to be notified when API access becomes available.
          </p>
          <div className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md cursor-not-allowed opacity-70">
            Join Waitlist (Coming Soon)
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Api;
