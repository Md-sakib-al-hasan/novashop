'use client';

import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/app/auth-context';
import { Bell, User } from 'lucide-react';
import Link from 'next/link';

export function AdminHeader() {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="sticky top-0 hidden md:block z-40 w-full border-b border-border bg-card/95 backdrop-blur"
    >
      <div className="flex items-center justify-between px-6 py-4 ">
        <h2 className="hidden md:block text-xl font-semibold">
          Admin Dashboard
        </h2>

        <div className="hidden md:flex items-center gap-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </motion.button>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.fullName || 'Admin User'}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-accent-foreground font-bold">
              {user?.fullName?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>

          <ThemeToggle />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium"
          >
            Logout
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
