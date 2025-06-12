
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  stepNumber: number;
  title: string;
  description: string;
  features: Array<{
    icon: LucideIcon;
    text: string;
  }>;
  icon: LucideIcon;
  reverse?: boolean;
}

const ProcessStep = ({ stepNumber, title, description, features, icon: Icon, reverse = false }: ProcessStepProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className={reverse ? "order-2 md:order-1" : "order-2 md:order-2"}>
        <div className="glass-card p-8 h-full">
          <h3 className="text-2xl font-bold mb-4">{stepNumber}. {title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <feature.icon className="h-5 w-5 text-tezaoro-400 shrink-0 mt-1" />
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={reverse ? "order-1 md:order-2" : "order-1 md:order-1"}>
        <div className="bg-card/20 p-8 rounded-lg shadow-inner flex items-center justify-center">
          <Icon className="h-24 w-24 text-tezaoro-400" />
        </div>
      </div>
    </div>
  );
};

export default ProcessStep;
