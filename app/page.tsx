'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const floatingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: [0, -20, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      className="min-h-screen pt-24 bg-gradient-to-br from-background via-background to-secondary/20 flex flex-col items-center px-4"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl text-center"
      >
        {/* Logo/Brand */}
        <motion.div
          variants={floatingVariants}
          className="mb-8"
        >
          <span className="text-7xl">🛍️</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl font-bold text-foreground mb-6 text-balance"
        >
          Welcome to{' '}
          <span className="bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent">
            OnlineShop
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-3xl text-muted-foreground mb-8 text-balance leading-relaxed"
        >
          Premium E-Commerce Experience with Seamless Authentication
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Discover a beautifully crafted shopping platform with smooth animations, multi-step registration, and OTP verification. Your premium shopping journey starts here.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/register')}
            className="px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-lg shadow-lg transition-all text-lg"
          >
            Create Account
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/login')}
            className="px-8 py-4 bg-secondary hover:bg-secondary/80 text-foreground font-bold rounded-lg border border-border/50 transition-all text-lg"
          >
            Sign In
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {[
            {
              icon: '✨',
              title: 'Premium Design',
              description: 'Beautifully crafted UI with modern aesthetics',
            },
            {
              icon: '🎭',
              title: 'Smooth Animations',
              description: 'Seamless transitions and interactive elements',
            },
            {
              icon: '🔐',
              title: 'Secure Auth',
              description: 'Multi-step registration with OTP verification',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-6 bg-card border border-border/30 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-border/30 text-muted-foreground"
        >
          <p>© 2024 OnlineShop. All rights reserved. | Premium E-Commerce Platform</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
