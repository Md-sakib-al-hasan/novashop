'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/app/auth-context';
import OTPModal from './otp-modal';

const steps = [
  {
    title: 'Create Your Account',
    subtitle: 'Let\'s start with your name',
    fields: ['fullName', 'username'],
  },
  {
    title: 'Email & Password',
    subtitle: 'Secure your account',
    fields: ['email', 'password'],
  },
  {
    title: 'Confirm Password',
    subtitle: 'Make sure it matches',
    fields: ['confirmPassword'],
  },
];

export default function RegistrationForm() {
  const {
    registrationStep,
    registrationData,
    updateRegistrationData,
    nextStep,
    previousStep,
  } = useAuth();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showOTPModal, setShowOTPModal] = useState(false);

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    const currentStepFields = steps[registrationStep].fields;

    if (registrationStep === 0) {
      if (!registrationData.fullName.trim())
        newErrors.fullName = 'Full name is required';
      if (!registrationData.username.trim())
        newErrors.username = 'Username is required';
    } else if (registrationStep === 1) {
      if (!registrationData.email.trim())
        newErrors.email = 'Email is required';
      if (!registrationData.email.includes('@'))
        newErrors.email = 'Please enter a valid email';
      if (!registrationData.password.trim())
        newErrors.password = 'Password is required';
      if (registrationData.password.length < 6)
        newErrors.password = 'Password must be at least 6 characters';
    } else if (registrationStep === 2) {
      if (!registrationData.confirmPassword.trim())
        newErrors.confirmPassword = 'Please confirm your password';
      if (registrationData.password !== registrationData.confirmPassword)
        newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (registrationStep === steps.length - 1) {
        setShowOTPModal(true);
      } else {
        nextStep();
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    updateRegistrationData({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const transition = {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.3 },
  };

  const currentStep = steps[registrationStep];

  return (
    <>
      <Card className="w-full max-w-md mx-auto p-8 bg-gradient-to-br from-card via-card to-secondary/30 border-primary/10 shadow-2xl">
        {/* Step Indicator */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 flex-1 rounded-full ${index <= registrationStep
                  ? 'bg-accent'
                  : 'bg-muted'
                }`}
              layoutId={`step-${index}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={registrationStep > 0 ? 1 : -1}>
          <motion.div
            key={registrationStep}
            custom={registrationStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {currentStep.title}
              </h2>
              <p className="text-muted-foreground">
                {currentStep.subtitle}
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {registrationStep === 0 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-semibold">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={registrationData.fullName}
                      onChange={(e) =>
                        handleInputChange('fullName', e.target.value)
                      }
                      className="h-12 bg-input border-border/50 focus:border-accent"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-semibold">
                      Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="johndoe"
                      value={registrationData.username}
                      onChange={(e) =>
                        handleInputChange('username', e.target.value)
                      }
                      className="h-12 bg-input border-border/50 focus:border-accent"
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm">{errors.username}</p>
                    )}
                  </div>
                </>
              )}

              {registrationStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={registrationData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className="h-12 bg-input border-border/50 focus:border-accent"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={registrationData.password}
                      onChange={(e) =>
                        handleInputChange('password', e.target.value)
                      }
                      className="h-12 bg-input border-border/50 focus:border-accent"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>
                </>
              )}

              {registrationStep === 2 && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={registrationData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange('confirmPassword', e.target.value)
                    }
                    className="h-12 bg-input border-border/50 focus:border-accent"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          {registrationStep > 0 && (
            <Button
              variant="outline"
              onClick={previousStep}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            className={`${registrationStep > 0 ? 'flex-1' : 'w-full'} h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold`}
          >
            {registrationStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </Card>

      <OTPModal isOpen={showOTPModal} onClose={() => setShowOTPModal(false)} />
    </>
  );
}
