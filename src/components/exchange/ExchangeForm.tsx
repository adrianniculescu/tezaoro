
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft } from 'lucide-react';
import CurrencyInput from './CurrencyInput';

interface ExchangeFormProps {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  exchangeAmount: string;
  currencies: string[];
  onFromCurrencyChange: (value: string) => void;
  onToCurrencyChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onSwapCurrencies: () => void;
  onCalculateRate: () => void;
}

const ExchangeForm = ({
  fromCurrency,
  toCurrency,
  amount,
  exchangeAmount,
  currencies,
  onFromCurrencyChange,
  onToCurrencyChange,
  onAmountChange,
  onSwapCurrencies,
  onCalculateRate
}: ExchangeFormProps) => {
  return (
    <Card className="glass-card bg-card p-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Exchange Cryptocurrencies</h2>
          <p className="text-muted-foreground">Demo exchange with sample data</p>
        </div>

        <div className="space-y-4">
          <CurrencyInput
            label="You Send"
            amount={amount}
            currency={fromCurrency}
            currencies={currencies}
            onAmountChange={onAmountChange}
            onCurrencyChange={onFromCurrencyChange}
          />

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={onSwapCurrencies}
              className="rounded-full p-2"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          <CurrencyInput
            label="You Receive"
            amount={exchangeAmount}
            currency={toCurrency}
            currencies={currencies}
            onAmountChange={() => {}}
            onCurrencyChange={onToCurrencyChange}
            readOnly={true}
          />

          <div className="space-y-3">
            <Button
              onClick={onCalculateRate}
              disabled={!amount}
              className="w-full"
              variant="outline"
            >
              Get Exchange Rate
            </Button>
            
            <Button
              disabled={!exchangeAmount}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Start Exchange (Demo)
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Demo rates for testing • No real transactions</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExchangeForm;
