"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { RegistrationFormData } from './Step1';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { OTPModal } from './OTPModal';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export const RegistrationForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [formData, setFormData] = useState<RegistrationFormData>({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    // State Persistence
    useEffect(() => {
        if (isLoaded) return;
        const savedData = localStorage.getItem('registration_form');

        setTimeout(() => {
            if (savedData) {
                try {
                    const { step: savedStep, formData: savedFormData } = JSON.parse(savedData);
                    setStep(savedStep);
                    setFormData(savedFormData);
                } catch (e) {
                    console.error("Failed to parse saved registration data", e);
                }
            }
            setIsLoaded(true);
        }, 0);
    }, [isLoaded]);

    useEffect(() => {
        if (formData.name || formData.email) { // Only save if there's some data
            localStorage.setItem('registration_form', JSON.stringify({ step, formData }));
        }
    }, [step, formData]);

    const nextStep = () => {
        if (validateStep()) {
            setDirection(1);
            setStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        setDirection(-1);
        setStep((prev) => prev - 1);
    };

    const validateStep = () => {
        if (step === 1) return formData.name && formData.username;
        if (step === 2) return formData.email && formData.phone;
        if (step === 3) return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
        return true;
    };

    const handleSubmit = () => {
        if (validateStep()) {
            setIsModalOpen(true);
        }
    };

    const onOTPComplete = () => {
        setIsModalOpen(false);
        localStorage.removeItem('registration_form');
        router.push('/register');
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0,
        }),
    };

    return (
        <div className="w-full">
            <div className="relative min-h-[300px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 },
                        }}
                        className="w-full"
                    >
                        {step === 1 && <Step1 formData={formData} setFormData={setFormData} />}
                        {step === 2 && <Step2 formData={formData} setFormData={setFormData} />}
                        {step === 3 && <Step3 formData={formData} setFormData={setFormData} />}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center gap-4 mt-12 w-full">
                <Button
                    variant="ghost"
                    onClick={prevStep}
                    className={cn(
                        "w-full sm:w-auto px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-2xl uppercase text-[10px] font-bold tracking-[0.2em] transition-all",
                        step === 1 ? 'hidden' : ''
                    )}
                >
                    Change method
                </Button>
                {step === 1 && (
                    <Button
                        variant="ghost"
                        className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-2xl uppercase text-[10px] font-bold tracking-[0.2em] transition-all"
                    >
                        Change method
                    </Button>
                )}
                <Button
                    onClick={step < 3 ? nextStep : handleSubmit}
                    disabled={!validateStep()}
                    className="w-full sm:flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl uppercase text-[10px] font-bold tracking-[0.2em] transition-all shadow-lg shadow-blue-500/25"
                >
                    {step < 3 ? 'Next' : 'Create account'}
                </Button>
            </div>

            <OTPModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onComplete={onOTPComplete} />
        </div>
    );
};
