'use client'

import { signOut } from "actions/auth/signout";
import { redirect } from "next/navigation";
import { ExitIcon } from "@radix-ui/react-icons";

export default function SignOutForm() {
    return (
        <button
            onClick={async () => {
                await signOut()
                redirect('/')
            }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors duration-150 text-left bg-transparent border-none cursor-pointer"
        >
            <ExitIcon
                className="w-[18px] h-[18px] shrink-0"
                aria-hidden="true"
            />
            Log Out
        </button>
    );
}
