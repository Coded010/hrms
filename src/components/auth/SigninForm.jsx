'use client';

import Link from "next/link";
import { useState } from "react";
import { signIn } from "actions/auth/signin";
import { useForm } from "react-hook-form"
import { signInSchema } from "lib/validation/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { getCurrentInputState } from "@/app/actions/validation/getCurrentInputState"
import Field from "components/ui/Field"

export default function SigninForm() {
    const {
        register, 
        handleSubmit, 
        watch, 
        formState: {
            errors, 
            isSubmitting 
        }
    } = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        },
        mode: "onBlur"
    })

    const [focusFields, setFocusFields] = useState({ email: false, password: false })
    const formData = watch()

    const onSubmit = async (data) => {
        try {
            await signIn(data)
        } catch (error) {
            console.error('Sign-in error:', error)
        }
    }

    const setFocus = (field, isFocused) => {
        setFocusFields(prev => ({ ...prev, [field]: isFocused }))
    }

    const emailInfo = getCurrentInputState('email', formData.email, errors.email, focusFields.email)
    const passwordInfo = getCurrentInputState('password', formData.password, errors.password, focusFields.password)
    
    return (
        <form className="flex flex-col justify-center items-center gap-13 w-full" onSubmit={handleSubmit(onSubmit)}>
            <Field  
                type='email'
                placeholder='Enter your email'
                registration={register('email')}
                state={emailInfo.state}
                message={emailInfo.message}
                disabled={isSubmitting}
                onFocus={() => setFocus('email', true)}
                onBlur={() => setFocus('email', false)}
            />

            <div className='relative w-full'>
                <Link href='/reset-password' 
                    className='absolute text-primary text-[16px] right-2 bottom-[-25px] hover:underline hover:underline-offset-2'
                >
                    Forgot password?
                </Link>

                <Field
                    type='password'
                    placeholder='Enter your password'
                    registration={register('password')}
                    state={passwordInfo.state}
                    message={passwordInfo.message}
                    disabled={isSubmitting}
                    onFocus={() => setFocus('password', true)}
                    onBlur={() => setFocus('password', false)}
                />
            </div>

            <button 
                type="submit"
                className="btn btn-primary btn-lg w-full"
                disabled={isSubmitting}
            >
                Sign in
            </button>
        </form>
    );
}