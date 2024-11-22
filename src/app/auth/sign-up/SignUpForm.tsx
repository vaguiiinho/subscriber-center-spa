'use client'
import { AuthForm } from "@/app/components/AuthForm"

export default function SingupForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        alert('submit from register')
        e.preventDefault()
    }
    return (
        <AuthForm formType='signUp' onSubmit={handleSubmit} />
    )
}
