'use client'

import { signOut } from "@/app/actions/auth/signout";
import { redirect } from "next/navigation";

export default function SignOutForm() {
    return (
        <button
            onClick={async () => {
                await signOut()
                redirect('/signin')
            }}
            className="btn btn-error"
        >
            Sign out
        </button>
    );
}
