"use client";

import React from 'react';
import { Input } from '@/components/ui/Input';
import { Mail, Phone } from 'lucide-react';

interface RegistrationFormData {
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

interface StepProps {
    formData: RegistrationFormData;
    setFormData: (data: RegistrationFormData) => void;
}

export const Step2: React.FC<StepProps> = ({ formData, setFormData }) => {
    return (
        <div className="space-y-6">
            <div className="space-y-2 relative">
                <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 ml-1">Email</label>
                <div className="relative group">
                    <Input
                        type="email"
                        placeholder="michal.masiak@anywhere.co"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[#1e2126] border-none rounded-2xl h-14 text-white placeholder:text-slate-600 focus-visible:ring-2 focus-visible:ring-blue-500/50 transition-all pl-4 pr-12"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                </div>
            </div>
            <div className="space-y-2 relative">
                <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 ml-1">Phone Number</label>
                <div className="relative group">
                    <Input
                        type="tel"
                        placeholder="+1 234 567 890"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-[#1e2126] border-none rounded-2xl h-14 text-white placeholder:text-slate-600 focus-visible:ring-2 focus-visible:ring-blue-500/50 transition-all pl-4 pr-12"
                    />
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                </div>
            </div>
        </div>
    );
};
