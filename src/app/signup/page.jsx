import SignupForm from "components/auth/SignupForm";
import Link from "next/link";

export const metadata = {
    title: "Sign up",
    description: "Enter your credentials to create an account",
};

export default function Signup() {
    return (
        <main className="flex flex-col items-center justify-center h-screen gap-15">
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-primary text-4xl font-bold">Sign up</h1>
                <p className="text-center text-gray-500">
                    Enter your credentials to create an account
                </p>
            </div>
        
            <div className="w-full max-w-sm">
                <SignupForm />
            </div>

            <div className="flex flex-col items-center gap-3">
                <p className="text-center text-gray-500">
                    Already have an account?
                </p>
                <Link href="/" className="text-primary">
                    Sign in
                </Link>
            </div>
        </main>
    );
}