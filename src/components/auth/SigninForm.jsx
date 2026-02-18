'use client';

import Link from "next/link";
import { useState } from "react";
import { signIn } from "@/app/actions/auth/signin";

export default function SigninForm() {
    const [formData, setFormData] = useState({ 
        email: '', 
        password: '' 
    });

    async function handleSubmit(e) {
        e.preventDefault();
        await signIn(formData);
    }

    return (
        <form className="flex flex-col justify-center items-center gap-13 " onSubmit={handleSubmit}>
            <div className="input input-lg w-full">
                <input type="email"
                placeholder="Enter your email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="input input-lg w-full">
                <Link href="/reset-password" 
                className="absolute text-[#5BB98B] text-[16px] right-2 bottom-13"
                >
                    Forgot password?
                </Link>
                <input type="password"
                placeholder="Enter your password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </div>

            <button 
            type="submit"
            className="btn btn-primary btn-lg w-full"
            >
                Sign in
            </button>
        </form>
    );
}