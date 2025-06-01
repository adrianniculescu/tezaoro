
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CurrencyInputProps {
  label: string;
  amount: string;
  currency: string;
  currencies: string[];
  onAmountChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
}

const CurrencyInput = ({
  label,
  amount,
  currency,
  currencies,
  onAmountChange,
  onCurrencyChange,
  readOnly = false,
  placeholder = "0.00"
}: CurrencyInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type={readOnly ? "text" : "number"}
            placeholder={placeholder}
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            readOnly={readOnly}
            className={`text-lg ${readOnly ? 'bg-muted' : ''}`}
          />
        </div>
        <Select value={currency} onValueChange={onCurrencyChange}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((curr) => (
              <SelectItem key={curr} value={curr}>
                {curr.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CurrencyInput;
