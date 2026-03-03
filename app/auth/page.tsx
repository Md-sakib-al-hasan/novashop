"use client";

import React from 'react';
import { LoginForm } from "@/components/login/LoginForm";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function AuthPage() {
    return (
        <main className="min-h-screen w-full bg-[#0f1113] relative overflow-hidden flex flex-col items-center justify-center p-6 md:p-12">
            {/* Vibrant Mesh Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-emerald-500/20 rounded-full blur-[100px] animate-bounce [animation-duration:10s]" />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/20 rounded-full blur-[110px] animate-pulse [animation-duration:8s]" />
                <div className="absolute bottom-[-5%] left-[5%] w-[45%] h-[45%] bg-purple-600/20 rounded-full blur-[130px] animate-pulse [animation-duration:12s]" />

                {/* Subtle Architectural Grid Overlay */}
                <svg width="100%" height="100%" className="opacity-20">
                    <defs>
                        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Subtle Gradient Overlays */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px]" />

            <header className="relative z-20 w-full max-w-7xl flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-xl font-light tracking-[0.4em] text-white uppercase">
                        Online<span className="font-semibold text-blue-500">Shop</span>
                    </h1>
                </div>
                <ThemeToggle />
            </header>

            <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                <div className="w-full space-y-4">
                    <LoginForm />
                    <p className="text-center lg:text-left text-slate-600 text-[10px] uppercase tracking-[0.2em] px-4">
                        By logging in, you agree to our terms of service and privacy policy.
                    </p>
                </div>

                <div className="w-full space-y-4">
                    <RegistrationForm />
                    <p className="text-center lg:text-left text-slate-600 text-[10px] uppercase tracking-[0.2em] px-4">
                        Join our premium community and enjoy exclusive benefits and personalized shopping.
                    </p>
                </div>
            </div>

            <footer className="relative z-20 w-full max-w-7xl mt-16 flex justify-center border-t border-white/5 pt-8">
                <p className="text-slate-600 text-[10px] uppercase tracking-[0.4em]">
                    &copy; 2026 OnlineShop Premium. All rights reserved.
                </p>
            </footer>
        </main>
    );
}
