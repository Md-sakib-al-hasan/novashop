'use client';

import { motion } from 'framer-motion';
import { DataTable } from '@/components/admin/data-table';
import { Plus } from 'lucide-react';

export default function UsersPage() {
  return (
    <div className="space-y-6 mt-10 md:mt-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage and monitor your users</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 py-1 px-2 md:px-6 md:py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-shadow"
        >
          <Plus className="md:block hidden" size={20} />
          Add User
        </motion.button>
      </motion.div>

      {/* Table */}
      <DataTable />
    </div>
  );
}
