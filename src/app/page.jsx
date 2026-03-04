import SignOutForm from "components/auth/SignoutForm";
import { getCurrentUser } from "lib/supabase/auth/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Home() {
    const user = await getCurrentUser();

    return (
        <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-4xl font-bold">Hello World 😎</h1>
            <h1 className="text-base font-mono">💯</h1>
            {!user && redirect('/signin')}
            {user && <SignOutForm />}
        </div>
    );
}
