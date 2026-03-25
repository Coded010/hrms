"use client";

import Link from "next/link";
import { useState } from "react";
import { signUp } from "actions/auth/signup";
import { useForm, useWatch } from "react-hook-form";
import { signUpSchema } from "lib/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCurrentInputState } from "@/app/actions/validation/getCurrentInputState";
import Field from "components/ui/Field";

export default function SignupForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            department: "",
            role: "",
            email: "",
            password: "",
        },
        mode: "onBlur",
    });

    const [focusFields, setFocusFields] = useState({
        firstName: false,
        lastName: false,
        department: false,
        role: false,
        email: false,
        password: false,
    });

    const firstNameValue = useWatch({ control, name: "firstName" }) || "";
    const lastNameValue = useWatch({ control, name: "lastName" }) || "";
    const departmentValue = useWatch({ control, name: "department" }) || "";
    const roleValue = useWatch({ control, name: "role" }) || "";
    const emailValue = useWatch({ control, name: "email" }) || "";
    const passwordValue = useWatch({ control, name: "password" }) || "";

    const onSubmit = async (data) => {
        try {
            await signUp(data);
        } catch (error) {
            console.error("Sign-up error:", error);
        }
    };

    const setFocus = (field, isFocused) => {
        setFocusFields((prev) => ({ ...prev, [field]: isFocused }));
    };

    const firstNameInfo = getCurrentInputState(
        "firstName",
        firstNameValue,
        errors.firstName,
        focusFields.firstName,
    );
    const lastNameInfo = getCurrentInputState(
        "lastName",
        lastNameValue,
        errors.lastName,
        focusFields.lastName,
    );
    const departmentInfo = getCurrentInputState(
        "department",
        departmentValue,
        errors.department,
        focusFields.department,
    );
    const roleInfo = getCurrentInputState(
        "role",
        roleValue,
        errors.role,
        focusFields.role,
    );
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
            className="flex flex-col gap-6 sm:gap-8 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-6 sm:gap-y-5 w-full">

                <Field
                    type="text"
                    placeholder="Enter your first name"
                    registration={register("firstName")}
                    state={firstNameInfo.state}
                    message={firstNameInfo.message}
                    disabled={isSubmitting}
                    onFocus={() => setFocus("firstName", true)}
                    onBlur={() => setFocus("firstName", false)}
                />
                <Field
                    type="text"
                    placeholder="Enter your last name"
                    registration={register("lastName")}
                    state={lastNameInfo.state}
                    message={lastNameInfo.message}
                    disabled={isSubmitting}
                    onFocus={() => setFocus("lastName", true)}
                    onBlur={() => setFocus("lastName", false)}
                />
                <Field
                    type="select"
                    registration={register("department")}
                    state={departmentInfo.state}
                    message={departmentInfo.message}
                    disabled={isSubmitting}
                    onFocus={() => setFocus("department", true)}
                    onBlur={() => setFocus("department", false)}
                >
                    <option value="" disabled>Select Department</option>
                    <option value="BSCS">BSCS</option>
                    <option value="BSN">BSN</option>
                    <option value="BSA">BSA</option>
                    <option value="BSBA">BSBA</option>
                    <option value="BSED">BSED</option>
                    <option value="BEED">BEED</option>
                    <option value="BSCRIM">BSCRIM</option>
                </Field>
                <Field
                    type="select"
                    registration={register("role")}
                    state={roleInfo.state}
                    message={roleInfo.message}
                    disabled={isSubmitting}
                    onFocus={() => setFocus("role", true)}
                    onBlur={() => setFocus("role", false)}
                >
                    <option value="" disabled>Select Role</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="HR">HR</option>
                    <option value="FINANCE">FINANCE</option>
                    <option value="DEAN">DEAN</option>
                    <option value="PROFESSOR">PROFESSOR</option>
                    <option value="INSTRUCTOR">INSTRUCTOR</option>
                    <option value="TEACHER">TEACHER</option>
                </Field>
                
                <section className="col-span-1 sm:col-span-2">
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
                </section>

                <section className="col-span-1 sm:col-span-2">
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
                </section>

            </section>
            
            <button
                type="submit"
                className="btn btn-primary btn-md sm:btn-lg w-full mt-2"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <span className="loading loading-spinner"></span>
                        Signing up...
                    </>
                ) : (
                    "Sign up"
                )}
            </button>
        </form>
    );
}
