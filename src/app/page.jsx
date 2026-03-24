import SigninForm from "components/auth/SigninForm";
import Link from "next/link";
import { getCurrentUser } from "lib/supabase/auth/getCurrentUser";
import { getRedirectPath } from "lib/supabase/auth/getRedirectPath";
import { redirect } from "next/navigation";

export default async function Signin() {
    const claims = await getCurrentUser();

    if (claims) {
        const path = await getRedirectPath(claims.sub);
        redirect(path);
    }

    return (
    <main className="flex min-h-screen w-full overflow-hidden">
        <main className="flex flex-col items-center justify-center w-full lg:w-1/2 min-h-screen p-4">
            <section className="flex flex-col gap-8 w-full max-w-md">
                <header className="flex flex-col items-center gap-4">
                    <div 
                        className="tooltip tooltip-top" 
                        data-tip="Sign in to your HR Dashboard"
                    >
                        <img 
                            src="./official-logo.png" 
                            className="w-16 h-16 sm:w-20 sm:h-20 hover:scale-105 hover:-rotate-8 transition-transform duration-300"
                            alt="Tomas-Claudio-Colleges"
                        />
                    </div>
                    <section className="text-center space-y-1">
                        <h1 className="text-primary text-3xl sm:text-4xl font-bold">Welcome</h1>
                        <p className="text-gray-500 text-sm sm:text-base">
                            Enter your credentials to access your dashboard
                        </p>
                    </section>
                </header>

                <main className="w-full">
                    <SigninForm />
                </main>

                <footer className="flex flex-col items-center gap-2">
                    <p className="text-center text-gray-500 text-sm sm:text-base">
                        Don&apos;t have an account?
                    </p>
                    <Link 
                        href="/signup" 
                        className="text-primary hover:underline font-medium"
                    >
                        Sign up
                    </Link>
                </footer>
            </section>
        </main>
        <figure className="hidden lg:flex flex-col border-l border-neutral/10 w-1/2 bg-[#5BB98B]/20">
        <div className="flex flex-1 items-center justify-center p-10">
          <div className="h-full w-full bg-[url('/temporary-bg.png')] bg-contain bg-center bg-no-repeat" />
        </div>
      </figure>
    </main>
    );
}
