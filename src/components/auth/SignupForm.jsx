'use client';

import Link from "next/link";
import { useState } from "react";
import { signUp } from "actions/auth/signup";
import { useForm } from "react-hook-form"
import { signUpSchema } from "lib/validation/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { getCurrentInputState } from "@/app/actions/validation/getCurrentInputState"
import Field from "components/ui/Field"

export default function SignupForm() {
    const {
        register,
        handleSubmit, 
        watch, 
        formState: {
            errors, 
            isSubmitting 
        }
    } = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '' 
        },
        mode: "onBlur"
    })

    const [focusFields, setFocusFields] = useState({ 
        firstName: false, 
        lastName: false, 
        email: false, 
        password: false 
    })  

    const formData = watch()

    const onSubmit = async (data) => {
        try {
            await signUp(data)
        } catch (error) {
            console.error('Sign-up error:', error)
        }
    }

    const setFocus = (field, isFocused) => {
        setFocusFields(prev => ({ ...prev, [field]: isFocused }))
    }

    const firstNameInfo = getCurrentInputState('firstName', formData.firstName, errors.firstName, focusFields.firstName)
    const lastNameInfo = getCurrentInputState('lastName', formData.lastName, errors.lastName, focusFields.lastName)
    const emailInfo = getCurrentInputState('email', formData.email, errors.email, focusFields.email)
    const passwordInfo = getCurrentInputState('password', formData.password, errors.password, focusFields.password)

    return (
        <form 
        className='flex flex-col justify-center items-center gap-13 w-full' 
        onSubmit={handleSubmit(onSubmit)}>
            <Field
                type='text'
                placeholder='Enter your first name'
                registration={register('firstName')}
                state={firstNameInfo.state}
                message={firstNameInfo.message}
                disabled={isSubmitting}
                onFocus={() => setFocus('firstName', true)}
                onBlur={() => setFocus('firstName', false)}
            />
            <Field
                type='text'
                placeholder='Enter your last name'
                registration={register('lastName')}
                state={lastNameInfo.state}
                message={lastNameInfo.message}
                disabled={isSubmitting}
                onFocus={() => setFocus('lastName', true)}
                onBlur={() => setFocus('lastName', false)}
            />
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

            <button 
                type='submit'
                className='btn btn-primary btn-lg w-full'
                disabled={isSubmitting}
            >
                Sign up
            </button>
        </form>
    );
}
