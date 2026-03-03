import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Image from "next/image";

export default function RegisterPage() {
    return (
        <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#121417] relative overflow-hidden">
            {/* Left Side: Form Content */}
            <div className="w-full lg:w-[55%] flex flex-col p-8 md:p-16 lg:p-24 relative z-10">
                <header className="flex justify-between items-center mb-16">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                            <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        </div>
                        <span className="text-white font-medium tracking-tight text-lg">Anywhere app.</span>
                    </div>
                </header>

                <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto lg:mx-0 w-full">
                    <div className="mb-12">
                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Start for free</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Create new account<span className="text-blue-500">.</span>
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Already A Member? <a href="/login" className="text-blue-500 hover:underline font-medium ml-1">Log In</a>
                        </p>
                    </div>

                    <RegistrationForm />
                </div>

                <footer className="mt-16 flex items-center justify-between">
                    <div className="flex gap-1 items-baseline">
                        <div className="w-1.5 h-6 bg-white rounded-full opacity-90" />
                        <div className="w-1.5 h-4 bg-white rounded-full opacity-60 ml-0.5" />
                        <div className="w-1.5 h-6 bg-white rounded-full opacity-90 ml-0.5" />
                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-90 ml-2" />
                    </div>
                </footer>
            </div>

            {/* Right Side: Scenic Background with Wavy Separator */}
            <div className="hidden lg:block lg:w-[45%] relative overflow-hidden">
                {/* Wavy Mask/Separator */}
                <div className="absolute inset-y-0 left-0 w-24 z-20 pointer-events-none">
                    <svg
                        viewBox="0 0 100 1000"
                        preserveAspectRatio="none"
                        className="h-full w-full fill-[#121417]"
                    >
                        <path d="M100,0 Q-50,250 100,500 T100,1000 L0,1000 L0,0 Z" />
                    </svg>
                </div>

                <div className="absolute inset-0">
                    <Image
                        src="/images/register-bg.png"
                        alt="Scenic Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#121417]/20 to-[#121417]/40" />
                </div>
            </div>

            <div className="absolute top-8 right-8 z-30">
                <ThemeToggle />
            </div>
        </main>
    );
}
