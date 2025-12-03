import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  gradient?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient = "from-blue-500 to-cyan-500",
  trend
}: StatCardProps) {
  return (
    <div className="glass-card p-6 hover:scale-[1.02] transition-all duration-300 shimmer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
          {subtitle && (
            <p className="text-slate-500 text-sm">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
          <span className="text-slate-500 text-sm">vs last month</span>
        </div>
      )}
    </div>
  );
}
