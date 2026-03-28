"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "actions/auth/signin";

export default function SigninForm() {
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = () => {
        setIsLoading(true);
    };

    return (
        <form
            className="flex flex-col gap-6 w-full"
            action={signIn}
            onSubmit={handleFormSubmit}
        >
            <section className="flex flex-col gap-4 sm:gap-5 w-full">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your email"
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your password"
                        disabled={isLoading}
                    />
                    <div className="flex justify-end w-full px-1 mt-1">
                        <Link
                            href="/reset-password"
                            className="text-primary text-sm hover:underline hover:underline-offset-2 transition-all duration-200"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>
            </section>

            <button
                type="submit"
                className="btn btn-primary btn-md sm:btn-lg w-full mt-2"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <span className="loading loading-spinner"></span>
                        Signing in...
                    </>
                ) : (
                    "Sign in"
                )}
            </button>
        </form>
    );
}
