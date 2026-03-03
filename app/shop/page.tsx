'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/auth-context';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';

export default function ShopPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Please log in first</h1>
          <Button onClick={() => router.push('/login')}>
            Go to Login
          </Button>
        </motion.div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pt-6"
    >
      {/* Navigation */}
      <motion.nav
        variants={itemVariants}
        className="bg-card border-b border-border/20 sticky top-0 z-50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-foreground">OnlineShop</h1>
          <div className="flex items-center gap-4">
            <span className="text-foreground font-medium">
              Welcome, {user.fullName}!
            </span>
            <ThemeToggle />
            <Button
              onClick={() => router.push('/admin')}
              variant="default"
              className="bg-accent text-accent-foreground"
            >
              Admin Panel
            </Button>
            <Button
              onClick={() => {
                logout();
                router.push('/login');
              }}
              variant="outline"
              className="border-border/50"
            >
              Logout
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Banner */}
      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-r from-accent via-accent/80 to-accent/60 text-white py-20 px-4"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-4 text-balance"
          >
            Welcome to Premium Shopping
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Discover our exclusive collection of premium products designed for you
          </motion.p>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-accent font-semibold rounded-lg hover:bg-white/90 transition-all"
          >
            Start Shopping
          </motion.button>
        </div>
      </motion.section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h3
          variants={itemVariants}
          className="text-3xl font-bold text-foreground mb-8"
        >
          Featured Products
        </motion.h3>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-card border border-border/30 rounded-xl overflow-hidden hover:shadow-xl transition-all"
            >
              {/* Product Image */}
              <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center relative overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-6xl"
                >
                  🛍️
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Premium Product {i + 1}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  High-quality item designed for excellence
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-accent">
                    ${(99.99 + i * 10).toFixed(2)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 text-sm font-semibold"
                  >
                    Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}
