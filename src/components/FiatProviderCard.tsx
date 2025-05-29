
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, DollarSign, Shield } from 'lucide-react';
import { FiatProvider } from '@/utils/changelly';

interface FiatProviderCardProps {
  provider: FiatProvider;
  selectedMethod: string;
  onSelect: (providerId: string) => void;
  isSelected: boolean;
}

const FiatProviderCard: React.FC<FiatProviderCardProps> = ({ 
  provider, 
  selectedMethod, 
  onSelect, 
  isSelected 
}) => {
  const getFeeForMethod = (method: string) => {
    const methodKey = method.toLowerCase().replace(/[^a-z]/g, '');
    if (methodKey.includes('card') || methodKey.includes('visa') || methodKey.includes('master')) {
      return provider.fees.card;
    }
    if (methodKey.includes('apple') || methodKey.includes('google')) {
      return provider.fees.applePay;
    }
    if (methodKey.includes('sepa')) {
      return provider.fees.sepa;
    }
    if (methodKey.includes('pix')) {
      return provider.fees.pix;
    }
    if (methodKey.includes('ach')) {
      return provider.fees.ach;
    }
    if (methodKey.includes('skrill')) {
      return provider.fees.skrill;
    }
    return 'Contact provider';
  };

  const currentFee = getFeeForMethod(selectedMethod);
  const supportsMethod = provider.supportedMethods.some(method => 
    method.toLowerCase().includes(selectedMethod.toLowerCase()) ||
    selectedMethod.toLowerCase().includes(method.toLowerCase())
  );

  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary border-primary' : 'hover:shadow-md'
      } ${!supportsMethod ? 'opacity-50' : ''}`}
      onClick={() => supportsMethod && onSelect(provider.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-lg">{provider.name}</h4>
          {supportsMethod ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
        {isSelected && <Badge variant="default">Selected</Badge>}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1">
            <Shield className="h-4 w-4 text-blue-500" />
            Non-KYC Limit:
          </span>
          <Badge variant="secondary">${provider.nonKycLimit}</Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-green-500" />
            Fee ({selectedMethod}):
          </span>
          <span className="font-medium text-primary">{currentFee || 'N/A'}</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Supported Methods:</p>
        <div className="flex flex-wrap gap-1">
          {provider.supportedMethods.map((method, index) => (
            <Badge 
              key={index} 
              variant={method.toLowerCase().includes(selectedMethod.toLowerCase()) ? "default" : "outline"}
              className="text-xs"
            >
              {method}
            </Badge>
          ))}
        </div>
      </div>

      {!supportsMethod && (
        <p className="text-xs text-red-500 mt-2">
          This provider doesn't support the selected payment method
        </p>
      )}
    </Card>
  );
};

export default FiatProviderCard;
