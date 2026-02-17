'use client';

import Link from "next/link";
import { useState } from "react";
import { signUp } from "@/app/actions/auth/signup";

export default function SignupForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '' 
    });

    async function handleSubmit(e) {
        e.preventDefault();
        await signUp(formData);
    }

    return (
        <form className="flex flex-col justify-center items-center gap-13 " onSubmit={handleSubmit}>
            <div className="input input-lg w-full">
                <input type="text"
                placeholder="Enter your first name"
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
            </div>

            <div className="input input-lg w-full">
                <input type="text"
                placeholder="Enter your last name"
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
            </div>

            <div className="input input-lg w-full">
                <input type="email"
                placeholder="Enter your email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="input input-lg w-full">
                <input type="password"
                placeholder="Enter your password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </div>

            <button 
            type="submit"
            className="btn btn-primary btn-lg w-full"
            >
                Sign up
            </button>
        </form>
    );
}