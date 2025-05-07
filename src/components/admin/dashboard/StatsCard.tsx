
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

const StatsCard = ({ title, value, icon, trend, className }: StatsCardProps) => {
  return (
    <div className={cn("bg-white rounded-xl shadow-sm p-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span 
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded",
                  trend.positive 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                )}
              >
                {trend.positive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-gray-500 text-xs ml-1">vs dernier mois</span>
            </div>
          )}
        </div>
        
        <div className="h-12 w-12 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
