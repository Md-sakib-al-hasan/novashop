'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/auth-context';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState, useEffect } from 'react';
import { Menu, X, LogOut, LayoutDashboard, User } from 'lucide-react';

const CATEGORIES = [
  { icon: '👕', label: 'Apparel' },
  { icon: '👟', label: 'Footwear' },
  { icon: '📱', label: 'Gadgets' },
  { icon: '⌚', label: 'Watches' },
  { icon: '🎧', label: 'Audio' },
  { icon: '📷', label: 'Photo' },
  { icon: '🎒', label: 'Travel' },
  { icon: '🕶️', label: 'Eyewear' },
  { icon: '🚲', label: 'Sports' },
  { icon: '🎮', label: 'Gaming' },
  { icon: '💻', label: 'Laptops' },
  { icon: '🔋', label: 'Power' }
];

const PRODUCTS = [
  { name: 'Classic White Tee', price: 29.99, description: '100% organic cotton essential', icon: '👕' },
  { name: 'Runner X1 Sneakers', price: 129.50, description: 'Built for performance and comfort', icon: '🥾' },
  { name: 'Pro Tablet 11"', price: 799.00, description: 'The power of a PC in your hands', icon: '🖥️' },
  { name: 'Nomad Backpack', price: 89.00, description: 'Weather-resistant travel companion', icon: '🎒' },
  { name: 'Aura Headphones', price: 249.99, description: 'Elite noise-cancellation technology', icon: '🎧' },
  { name: 'Vintage 35mm Camera', price: 450.00, description: 'Capture memories with soul', icon: '📷' },
  { name: 'Zenith Smartwatch', price: 199.00, description: 'Health tracking on your wrist', icon: '⌚' },
  { name: 'Lunar Sunglasses', price: 155.00, description: 'Timeless style, UV protection', icon: '🕶️' },
  { name: 'Summit Hybrid Bike', price: 1200.00, description: 'Conquer both trails and streets', icon: '🚴' },
  { name: 'Vortex Game Console', price: 499.99, description: 'Next-gen immersive gaming', icon: '🕹️' },
  { name: 'Logic Mech Keyboard', price: 175.00, description: 'Precision typing for pros', icon: '⌨️' },
  { name: 'Hyper Power Bank', price: 59.00, description: 'Keep your devices charged all day', icon: '🔋' }
];

export default function ShopPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

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
        className="bg-card/80 backdrop-blur-md border-b border-border/20 sticky top-0 z-50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="bg-accent text-accent-foreground w-8 h-8 rounded-lg flex items-center justify-center text-sm">NS</span>
              NovaShop
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">

              <ThemeToggle />
              <Button
                onClick={() => router.push('/admin')}
                variant="ghost"
                className="hover:bg-accent/10 hover:text-accent gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin
              </Button>
              <Button
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                variant="default"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Logout
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
                className="text-foreground"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Premium Mobile Sidebar (Drawer) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed  inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
              />

              {/* Sidebar Content */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-[280px] bg-white dark:bg-zinc-950 z-[70] shadow-2xl border-l border-border/20 md:hidden flex flex-col h-dvh opacity-100"
              >
                <div className="p-4 flex items-center justify-between border-b border-border/10 bg-white dark:bg-zinc-950">
                  <h2 className="text-xl font-bold text-foreground">Menu</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarOpen(false)}
                    className="rounded-full hover:bg-secondary/50"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-white dark:bg-zinc-950">
                  {/* User Profile Section */}
                  <div className="flex items-center gap-3 p-4 bg-secondary/10 rounded-2xl border border-border/5">
                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                      <User className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{user.fullName}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions List */}
                  <div className="space-y-2">
                    <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">Quick Links</p>
                    <Button
                      onClick={() => {
                        router.push('/admin');
                        setIsSidebarOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start gap-4 h-14 hover:bg-accent/10 hover:text-accent rounded-xl group transition-all border border-transparent hover:border-accent/20"
                    >
                      <div className="w-10 h-10 bg-accent/5 rounded-lg flex items-center justify-center group-hover:bg-accent/10">
                        <LayoutDashboard className="w-5 h-5 text-accent" />
                      </div>
                      <span className="font-semibold text-base">Admin Dashboard</span>
                    </Button>
                  </div>
                </div>

                {/* Bottom Logout Section */}
                <div className="border-t border-border/10 mt-auto bg-white dark:bg-zinc-950">
                  <Button
                    onClick={() => {
                      logout();
                      router.push('/login');
                    }}
                    variant="destructive"
                    className="w-full justify-center gap-2 h-12 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/10 active:scale-95 transition-all bg-red-500 hover:bg-red-600 border-none"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout Account
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
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

      {/* Browse Categories - Demo Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-foreground">Browse Categories</h3>
            <p className="text-muted-foreground">Expertly curated collections</p>
          </div>
          <Button variant="ghost" className="text-accent hover:text-accent font-semibold">
            View All Categories →
          </Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group cursor-pointer bg-card border border-border/10 rounded-2xl p-6 flex flex-col items-center justify-center transition-all hover:bg-accent/5 hover:border-accent/20 shadow-sm hover:shadow-md"
            >
              <span className="text-4xl mb-3 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                {cat.icon}
              </span>
              <span className="text-sm font-bold text-muted-foreground group-hover:text-accent transition-colors">
                {cat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

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
          {PRODUCTS.map((product, i) => (
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
                  {product.icon}
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  {product.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-accent">
                    ${product.price.toFixed(2)}
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
