'use client';

import { motion } from 'framer-motion';
import { DashboardStats } from '@/components/admin/dashboard-stats';
import { DataTable } from '@/components/admin/data-table';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 mt-10 md:mt-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back to AdminHub</h1>
        <p className="text-muted-foreground">
          Here's your business overview and analytics dashboard
        </p>
      </motion.div>

      {/* Stats */}
      <DashboardStats />

      {/* Data Table */}
      <div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold mb-4"
        >
          Recent Users
        </motion.h2>
        <DataTable />
      </div>
    </div>
  );
}
