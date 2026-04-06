import SignupForm from "components/auth/SignupForm";
import Link from "next/link";

export const metadata = {
    title: "Sign up",
    description: "Enter your credentials to create an account",
};

export default function Signup() {
    return (
    <main className="flex min-h-screen w-full overflow-hidden">
        <section className="flex flex-col items-center justify-center w-full lg:w-1/2 min-h-screen p-4">
            <section className="flex flex-col gap-8 max-w-2xl w-full py-8">
                <header className="flex flex-col items-center gap-4">
                    <div 
                        className="tooltip tooltip-top" 
                        data-tip="Welcome to TCC | HRMS"
                    >
                        <img 
                            src="/official-logo.png" 
                            className="w-16 h-16 sm:w-20 sm:h-20 hover:scale-105 hover:-rotate-8 transition-transform duration-300"
                            alt="Tomas-Claudio-Colleges"
                        />
                    </div>
                    <section className="text-center space-y-1">
                        <h1 className="text-primary text-3xl sm:text-4xl font-bold">Sign Up</h1>
                        <p className="text-gray-500 text-sm sm:text-base">
                            Enter your credentials to create an account
                        </p>
                    </section>
                </header>
            
                <main className="w-full">
                    <SignupForm />
                </main>

                <footer className="flex flex-col items-center gap-2">
                    <p className="text-center text-gray-500 text-sm sm:text-base">
                        Already have an account?
                    </p>    
                    <Link 
                        href="/" 
                        className="text-primary hover:underline font-medium"
                    >
                        Sign in
                    </Link>
                </footer>
            </section>
        </section>
        
        <figure className="hidden lg:flex flex-col border-l border-neutral/10 w-1/2 bg-[#5BB98B]/20">
        <div className="flex flex-1 items-center justify-center p-10">
        <div className="h-full w-full bg-[url('/temporary-bg.png')] bg-contain bg-center bg-no-repeat" />
        </div>
      </figure>
    </main>
    );
}