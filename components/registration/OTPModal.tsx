"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OTPModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export const OTPModal: React.FC<OTPModalProps> = ({ isOpen, onClose, onComplete }) => {
    const [view, setView] = useState<'selection' | 'input'>('selection');
    const [method, setMethod] = useState<string | null>(null);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onSelectMethod = (m: string) => {
        setMethod(m);
        setView('input');
        setError(null);
    };

    const verifyOtp = () => {
        const cleanOtp = otp.trim().replace(/\s/g, '');
        if (cleanOtp === '1234') {
            onComplete();
        } else {
            setError('Invalid OTP code. Try "1234"');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />

            <motion.div
                layout
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-sm glassmorphism p-6 rounded-2xl shadow-2xl overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {view === 'selection' ? (
                        <motion.div
                            key="selection"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <h3 className="text-xl font-bold">Verification</h3>
                                <p className="text-sm text-muted-foreground mt-2">Where should we send the OTP?</p>
                            </div>

                            <div className="grid gap-3">
                                <MethodButton
                                    icon={<Mail className="w-5 h-5" />}
                                    label="Email"
                                    onClick={() => onSelectMethod('Email')}
                                />
                                <MethodButton
                                    icon={<MessageSquare className="w-5 h-5" />}
                                    label="SMS"
                                    onClick={() => onSelectMethod('SMS')}
                                />
                                <MethodButton
                                    icon={<Phone className="w-5 h-5" />}
                                    label="WhatsApp"
                                    onClick={() => onSelectMethod('WhatsApp')}
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="input"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <h3 className="text-xl font-bold">Confirm OTP</h3>
                                <p className="text-sm text-muted-foreground mt-2">Sent to your {method}</p>
                            </div>

                            <div className="space-y-4">
                                <Input
                                    label="OTP Code"
                                    placeholder="Enter 1234"
                                    value={otp}
                                    onChange={(e) => {
                                        setOtp(e.target.value);
                                        setError(null);
                                    }}
                                    className="text-center text-2xl tracking-[0.5em] font-bold"
                                    maxLength={10}
                                    error={error || undefined}
                                />
                                <Button
                                    className="w-full"
                                    disabled={otp.trim().replace(/\s/g, '').length < 4}
                                    onClick={verifyOtp}
                                >
                                    Verify & Redirect
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => {
                                        setView('selection');
                                        setOtp('');
                                        setError(null);
                                    }}
                                >
                                    Change method
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

const MethodButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-4 p-4 rounded-xl border border-input hover:bg-accent hover:border-primary transition-all group"
    >
        <div className="p-2 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors">
            {icon}
        </div>
        <span className="font-medium">{label}</span>
    </button>
);
