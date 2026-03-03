'use client';

import { motion } from 'framer-motion';
import { Settings, Bell, Lock, Globe } from 'lucide-react';

const settingsGroups = [
  {
    title: 'Account Settings',
    icon: Lock,
    settings: [
      { label: 'Change Password', description: 'Update your account password' },
      { label: 'Two-Factor Authentication', description: 'Enable 2FA for better security' },
      { label: 'Account Recovery', description: 'Set up account recovery options' },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
      { label: 'Email Notifications', description: 'Receive updates via email' },
      { label: 'Order Alerts', description: 'Get notified about new orders' },
      { label: 'System Notifications', description: 'Receive system-wide alerts' },
    ],
  },
  {
    title: 'Business Settings',
    icon: Globe,
    settings: [
      { label: 'Store Information', description: 'Update your store details' },
      { label: 'Currencies & Languages', description: 'Manage supported currencies' },
      { label: 'Tax Settings', description: 'Configure tax rates' },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and business settings</p>
      </motion.div>

      {/* Settings Groups */}
      <div className="space-y-6">
        {settingsGroups.map((group, groupIdx) => {
          const Icon = group.icon;

          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIdx * 0.1 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              {/* Group Header */}
              <div className="px-6 py-4 border-b border-border flex items-center gap-3 bg-muted/30">
                <Icon className="text-accent" size={24} />
                <h2 className="text-xl font-semibold">{group.title}</h2>
              </div>

              {/* Settings List */}
              <div className="divide-y divide-border">
                {group.settings.map((setting, idx) => (
                  <motion.div
                    key={setting.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: groupIdx * 0.1 + idx * 0.05 }}
                    className="px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{setting.label}</p>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
                    >
                      Configure
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
