import React from 'react';
import { motion } from 'framer-motion';
import { RiskLevel, RISK_CONFIG } from '../../types';

interface RiskMeterProps {
  score: number;
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
}

const RiskMeter: React.FC<RiskMeterProps> = ({ score, level, size = 'md' }) => {
  const config = RISK_CONFIG[level];
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };
  
  const fontSize = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  };

  const getGradientColor = () => {
    if (score <= 30) {
      return 'from-green-400 to-green-600';
    } else if (score <= 60) {
      return 'from-yellow-400 to-orange-500';
    } else if (score <= 85) {
      return 'from-orange-500 to-red-500';
    } else {
      return 'from-red-500 to-red-700';
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Score Display */}
      <div className="relative mb-4">
        <svg className="transform -rotate-90" width={size === 'lg' ? 200 : size === 'md' ? 150 : 100} height={size === 'lg' ? 200 : size === 'md' ? 150 : 100}>
          {/* Background Circle */}
          <circle
            cx={size === 'lg' ? 100 : size === 'md' ? 75 : 50}
            cy={size === 'lg' ? 100 : size === 'md' ? 75 : 50}
            r={size === 'lg' ? 85 : size === 'md' ? 65 : 40}
            stroke="currentColor"
            strokeWidth={size === 'lg' ? 12 : size === 'md' ? 10 : 8}
            fill="none"
            className="text-slate-700"
          />
          {/* Progress Circle */}
          <motion.circle
            cx={size === 'lg' ? 100 : size === 'md' ? 75 : 50}
            cy={size === 'lg' ? 100 : size === 'md' ? 75 : 50}
            r={size === 'lg' ? 85 : size === 'md' ? 65 : 40}
            stroke="url(#gradient)"
            strokeWidth={size === 'lg' ? 12 : size === 'md' ? 10 : 8}
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
            animate={{ 
              strokeDasharray: `${(score / 100) * 534} 534`,
              strokeDashoffset: 0 
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={score <= 30 ? 'stop-color-green-400' : score <= 60 ? 'stop-color-yellow-400' : score <= 85 ? 'stop-color-orange-500' : 'stop-color-red-500'} />
              <stop offset="100%" className={score <= 30 ? 'stop-color-green-600' : score <= 60 ? 'stop-color-orange-500' : score <= 85 ? 'stop-color-red-500' : 'stop-color-red-700'} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className={`${fontSize[size]} font-bold bg-gradient-to-r ${getGradientColor()} bg-clip-text text-transparent`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {Math.round(score)}
          </motion.span>
          <span className="text-slate-400 text-xs">Risk Score</span>
        </div>
      </div>
      
      {/* Risk Level Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`px-6 py-2 rounded-full ${config.bgColor} ${config.color} font-semibold`}
      >
        {config.label}
      </motion.div>
    </div>
  );
};

export default RiskMeter;

