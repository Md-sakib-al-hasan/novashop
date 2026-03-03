'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export function DashboardStats() {
  const stats: StatCard[] = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      label: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      positive: true,
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Total Users',
      value: '2,456',
      change: '+12.5%',
      positive: true,
    },
    {
      icon: <Package className="w-6 h-6" />,
      label: 'Total Products',
      value: '1,234',
      change: '-2.4%',
      positive: false,
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Growth Rate',
      value: '24.5%',
      change: '+4.3%',
      positive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
              {stat.icon}
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                stat.positive
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
              }`}
            >
              {stat.change}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
          <p className="text-2xl font-bold">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
