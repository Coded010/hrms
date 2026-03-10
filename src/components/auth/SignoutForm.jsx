"use client";

import { signOut } from "actions/auth/signout";
import { useRouter } from "next/navigation";
import { ExitIcon } from "@radix-ui/react-icons";
import { useTransition } from "react";

export default function SignOutForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return (
        <button
            onClick={() => {
                startTransition(async () => {
                    await signOut();
                    router.push("/");
                });
            }}
            disabled={isPending}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors duration-150 text-left bg-transparent border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isPending ? (
                <span className="loading loading-spinner loading-xs w-[18px] h-[18px] shrink-0"></span>
            ) : (
                <ExitIcon
                    className="w-[18px] h-[18px] shrink-0"
                    aria-hidden="true"
                />
            )}
            {isPending ? "Logging Out..." : "Log Out"}
        </button>
    );
}
