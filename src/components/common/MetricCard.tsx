import React from 'react';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon?: LucideIcon;
  variant?: 'default' | 'highlight' | 'warning' | 'danger';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  change,
  isPositive,
  icon: Icon,
  variant = 'default'
}) => {
  return (
    <div className={clsx(
      'rounded-xl p-5 border transition-all duration-200',
      'bg-white dark:bg-slate-900 shadow-sm hover:shadow',
      variant === 'default' && 'border-slate-200 dark:border-slate-800',
      variant === 'highlight' && 'border-blue-200 bg-blue-50/20 dark:border-blue-900/50 dark:bg-blue-950/10',
      variant === 'warning' && 'border-amber-200 bg-amber-50/20 dark:border-amber-900/50 dark:bg-amber-950/10',
      variant === 'danger' && 'border-rose-200 bg-rose-50/20 dark:border-rose-900/50 dark:bg-rose-950/10'
    )}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </div>
        {change && (
          <span className={clsx(
            'text-xs font-medium px-2 py-0.5 rounded-full flex items-center',
            isPositive ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
          )}>
            {isPositive ? '+' : ''}{change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
};
