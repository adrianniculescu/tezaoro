
import React from 'react';
import { TrendingUp, Shield } from 'lucide-react';

type LogoProps = {
  className?: string;
  showText?: boolean;
};

const Logo: React.FC<LogoProps> = ({ className = "", showText = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-tezaoro-400 to-accent">
        <TrendingUp className="h-4 w-4 text-white absolute" />
        <Shield className="h-5 w-5 text-white opacity-60" />
      </div>
      {showText && (
        <span className="font-bold text-2xl text-gradient">Tezaoro</span>
      )}
    </div>
  );
};

export default Logo;
