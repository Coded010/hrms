"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "actions/auth/signin";
import { useForm, useWatch } from "react-hook-form";
import { signInSchema } from "lib/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCurrentInputState } from "@/app/actions/validation/getCurrentInputState";
import Field from "components/ui/Field";

export default function SigninForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });

    const [focusFields, setFocusFields] = useState({
        email: false,
        password: false,
    });

    const emailValue = useWatch({ control, name: "email" }) || "";
    const passwordValue = useWatch({ control, name: "password" }) || "";

    const onSubmit = async (data) => {
        try {
            await signIn(data);
        } catch (error) {
            console.error("Sign-in error:", error);
        }
    };

    const setFocus = (field, isFocused) => {
        setFocusFields((prev) => ({ ...prev, [field]: isFocused }));
    };

    const emailInfo = getCurrentInputState(
        "email",
        emailValue,
        errors.email,
        focusFields.email,
    );
    const passwordInfo = getCurrentInputState(
        "password",
        passwordValue,
        errors.password,
        focusFields.password,
    );

    return (
        <form
            className="flex flex-col gap-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >   
            <section className="flex flex-col gap-4 sm:gap-5 w-full">

                <Field
                    type="email"
                    placeholder="Enter your email"
                    registration={register("email")}
                    state={emailInfo.state}
                    message={emailInfo.message}
                    disabled={isSubmitting}
                    onFocus={() => setFocus("email", true)}
                    onBlur={() => setFocus("email", false)}
                />

                <div className="flex flex-col gap-2 w-full">
                    <Field
                        type="password"
                        placeholder="Enter your password"
                        registration={register("password")}
                        state={passwordInfo.state}
                        message={passwordInfo.message}
                        disabled={isSubmitting}
                        onFocus={() => setFocus("password", true)}
                        onBlur={() => setFocus("password", false)}
                    />
                    <div className="flex justify-end w-full px-1">
                        <Link
                            href="/reset-password"
                            className="text-primary text-sm sm:text-base hover:underline hover:underline-offset-2 transition-all duration-200"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>

            </section>
            
            <button
                type="submit"
                className="btn btn-primary btn-md sm:btn-lg w-full mt-2"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
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