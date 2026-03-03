"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Lock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const LoginForm: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full p-8 md:p-12 glassmorphism rounded-[2.5rem] shadow-2xl border border-white/10"
        >
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-light tracking-[0.2em] text-slate-300 uppercase mb-2">
                    Login
                </h2>
                <p className="text-slate-500 text-xs uppercase tracking-widest">Access your account</p>
            </div>

            <form className="space-y-8">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 ml-1">Email Address</label>
                    <div className="relative flex items-center group">
                        <User className="absolute left-0 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                            type="email"
                            placeholder="email@example.com"
                            className="pl-8 bg-transparent border-b border-white/10 border-t-0 border-x-0 rounded-none h-10 text-slate-300 placeholder:text-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-500/50 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 ml-1">Password</label>
                    <div className="relative flex items-center group">
                        <Lock className="absolute left-0 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-8 bg-transparent border-b border-white/10 border-t-0 border-x-0 rounded-none h-10 text-slate-300 placeholder:text-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-500/50 transition-all"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                    <Button
                        type="submit"
                        className="w-full md:w-auto bg-slate-100 hover:bg-white text-slate-900 px-12 py-3 rounded-full uppercase text-[10px] font-bold tracking-[0.2em] transition-all shadow-lg hover:shadow-white/10"
                    >
                        Submit
                    </Button>

                    <a href="#" className="text-slate-500 text-[10px] uppercase tracking-widest hover:text-slate-300 transition-colors">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </motion.div>
    );
};
