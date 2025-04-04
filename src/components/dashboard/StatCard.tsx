
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  className?: string;
}

const StatCard = ({ title, value, icon, change, className }: StatCardProps) => {
  const hasChange = change !== undefined;
  const isPositive = hasChange && change >= 0;
  
  return (
    <div className={cn("condo-stat-card", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="text-muted-foreground">{icon}</div>
      </div>
      <div className="text-2xl font-semibold">{value}</div>
      {hasChange && (
        <div className={cn(
          "flex items-center text-xs",
          isPositive ? "text-green-500" : "text-red-500"
        )}>
          {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          <span>{Math.abs(change)}% em relação ao mês anterior</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
