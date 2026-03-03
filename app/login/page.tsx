import { LoginForm } from "@/components/login/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-[#1a1c1e] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-900/40 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full px-4 flex justify-center">
                <LoginForm />
            </div>
        </main>
    );
}
