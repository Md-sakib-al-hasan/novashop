'use client';

import { motion } from 'framer-motion';
import { Link } from 'lucide-react';
import RegistrationForm from '@/components/registration-form';
import { ThemeToggle } from '@/components/theme-toggle';

export default function RegisterPage() {
  const bgVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      variants={bgVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex flex-col items-center justify-center px-4 py-8"
    >
      <div className="fixed md:top-8 md:right-8 top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col items-center gap-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-5xl font-bold text-foreground mb-2">
            OnlineShop
          </h1>
          <p className="text-muted-foreground text-lg">
            Create your account and start shopping
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div variants={itemVariants} className="w-full">
          <RegistrationForm />
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="text-center text-sm text-muted-foreground space-y-2"
        >
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-accent hover:underline font-semibold">
              Sign in here
            </a>
          </p>
          <p>© 2024 OnlineShop. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
