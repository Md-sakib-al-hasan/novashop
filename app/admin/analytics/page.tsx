'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';

const analyticsMetrics = [
  { title: 'Page Views', value: '124,582', change: '+12.5%', icon: BarChart3 },
  { title: 'Unique Users', value: '45,231', change: '+8.2%', icon: TrendingUp },
  { title: 'Bounce Rate', value: '42.3%', change: '-2.1%', icon: BarChart3 },
  { title: 'Avg Session', value: '5m 32s', change: '+18.7%', icon: TrendingUp },
  { title: 'Conversions', value: '8,942', change: '+23.4%', icon: BarChart3 },
  { title: 'Revenue/User', value: '$12.45', change: '+5.6%', icon: TrendingUp },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your business performance and insights</p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          const isPositive = metric.change.startsWith('+');

          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Icon size={24} />
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    isPositive
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                  }`}
                >
                  {metric.change}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-2">{metric.title}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-card border border-border rounded-xl p-12 h-96 flex items-center justify-center"
      >
        <div className="text-center">
          <BarChart3 size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Chart data visualization coming soon</p>
        </div>
      </motion.div>
    </div>
  );
}
