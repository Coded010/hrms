import SigninForm from "components/auth/SigninForm";
import Link from "next/link";

export const metadata = {
    title: "Sign in",
    description: "Sign in to your account",
};

export default async function Signin() {
    return (
        <main className="flex flex-col items-center justify-center h-screen gap-15">
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-primary text-4xl font-bold">Welcome</h1>
                <p className="text-center text-gray-500">
                    Enter your credentials to access your dashboard
                </p>
            </div>

            <div className="w-full max-w-sm">
                <SigninForm />
            </div>

            <div className="flex flex-col items-center gap-3">
                <p className="text-center text-gray-500">
                    Don&apos;t have an account?
                </p>
                <Link href="/signup" className="text-primary">
                    Sign up
                </Link>
            </div>
        </main>
    );
}
