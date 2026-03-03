'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/app/auth-context';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    if (!email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        router.push('/shop');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="w-full max-w-md mx-auto p-8 bg-gradient-to-br from-card via-card to-secondary/30 border-primary/10 shadow-2xl">
        <motion.div custom={0} variants={itemVariants} className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
          <p className="text-muted-foreground">
            Sign in to your OnlineShop account
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div custom={1} variants={itemVariants} className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="h-12 bg-input border-border/50 focus:border-accent"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </motion.div>

          <motion.div custom={2} variants={itemVariants} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-semibold">
                Password
              </Label>
              <a href="#" className="text-xs text-accent hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="h-12 bg-input border-border/50 focus:border-accent"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </motion.div>

          <motion.button
            custom={3}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-accent hover:bg-accent/90 disabled:opacity-50 text-accent-foreground font-semibold rounded-lg transition-all"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <motion.div custom={4} variants={itemVariants} className="mt-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '👤', label: 'Google' },
              { icon: '🔵', label: 'Facebook' },
              { icon: '🍎', label: 'Apple' },
            ].map(provider => (
              <Button
                key={provider.label}
                variant="outline"
                className="h-10 border-border/50 hover:border-accent/50 hover:bg-secondary/50"
              >
                <span>{provider.icon}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div custom={5} variants={itemVariants} className="mt-6 text-center">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <a href="/register" className="text-accent hover:underline font-semibold">
              Sign up now
            </a>
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
}
