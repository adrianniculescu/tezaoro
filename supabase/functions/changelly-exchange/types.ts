
export interface ChangellyRequest {
  id: string;
  jsonrpc: string;
  method: string;
  params: Record<string, any>;
}

export interface ChangellyResponse {
  id: string;
  jsonrpc: string;
  result?: any;
  error?: {
    code: number;
    message: string;
  };
}

export interface ApiKeys {
  publicKey: string;
  privateKey: string;
}
