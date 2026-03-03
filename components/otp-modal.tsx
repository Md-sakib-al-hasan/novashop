'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '@/app/auth-context';
import { useRouter } from 'next/navigation';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalStep = 'method' | 'otp';

export default function OTPModal({ isOpen, onClose }: OTPModalProps) {
  const { registrationData, updateRegistrationData, verifyOTP } = useAuth();
  const [modalStep, setModalStep] = useState<ModalStep>('method');
  const [otpValue, setOtpValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleMethodSelect = (method: 'email' | 'sms' | 'whatsapp') => {
    updateRegistrationData({ otpMethod: method });
    setModalStep('otp');
    setError('');
  };

  const handleVerifyOTP = async () => {
    if (otpValue.length !== 4) {
      setError('Please enter a valid OTP');
      return;
    }

    setIsLoading(true);
    try {
      const success = await verifyOTP(otpValue);
      if (success) {
        // Redirect after successful verification
        setTimeout(() => {
          router.push('/shop');
        }, 1000);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (modalStep === 'otp') {
      setModalStep('method');
      setOtpValue('');
      setError('');
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-96 bg-card border-border/50 shadow-2xl">
        <DialogTitle className="sr-only">OTP Verification</DialogTitle>
        <DialogDescription className="sr-only">
          Please verify your identity using one-time password
        </DialogDescription>
        <AnimatePresence mode="wait">
          {modalStep === 'method' ? (
            <motion.div
              key="method"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 py-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Verify Your Identity
                </h3>
                <p className="text-muted-foreground">
                  Where should we send your OTP?
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'email',
                    icon: '✉️',
                    title: 'Email',
                    description: `Send to ${registrationData.email}`,
                  },
                  {
                    id: 'sms',
                    icon: '📱',
                    title: 'SMS',
                    description: 'Send via text message',
                  },
                  {
                    id: 'whatsapp',
                    icon: '💬',
                    title: 'WhatsApp',
                    description: 'Send via WhatsApp',
                  },
                ].map(option => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      handleMethodSelect(option.id as 'email' | 'sms' | 'whatsapp')
                    }
                    className="w-full p-4 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-secondary/50 transition-all text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <p className="font-semibold text-foreground">
                          {option.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 py-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Enter OTP
                </h3>
                <p className="text-muted-foreground">
                  We've sent a code to your{' '}
                  {registrationData.otpMethod === 'email'
                    ? 'email'
                    : registrationData.otpMethod}
                </p>
              </div>

              <div className="flex justify-center py-4">
                <InputOTP
                  maxLength={4}
                  value={otpValue}
                  onChange={setOtpValue}
                >
                  <InputOTPGroup className="gap-4">
                    {[0, 1, 2, 3].map(index => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="w-12 h-12 text-xl border-2 border-border rounded-lg bg-secondary/50 focus:border-accent focus:bg-secondary"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <p className="text-sm text-muted-foreground text-center">
                Test OTP: <span className="font-mono font-semibold">1234</span>
              </p>

              <Button
                onClick={handleVerifyOTP}
                disabled={otpValue.length !== 4 || isLoading}
                className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>

              <button
                onClick={() => setModalStep('method')}
                className="w-full text-sm text-accent hover:underline"
              >
                Use different method
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
