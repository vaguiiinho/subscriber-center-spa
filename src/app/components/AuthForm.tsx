'use client'

import React from "react"
import { InputField } from "./InputField"

type AuthFormProps = {
  formType: 'signIn' | 'signUp'
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}


export const AuthForm: React.FC<AuthFormProps> = ({ formType, onSubmit }) => {

  return (
    <form onSubmit={onSubmit}
      className='flex w-full max-w-md flex-col space-y-4 rounded bg-[#141414]
         bg-opacity-90 px-4 py-8 shadow-lg'>
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold">{formType === 'signIn' ? 'SignIn' : 'SignUp'}</h1>
        <p className="text-sm text-gray-500">
          {formType === 'signIn' ? 'New to the app?' : 'Already have an account?'}
          {' '}
          <a href={formType === 'signIn' ? '/auth/sign-up' : '/auth/sign-in'} className="text-red-500 hover:underline">
            {formType === 'signIn' ? 'SignUp' : 'SignIn'}
          </a>
        </p>
      </div>
      <div className='mt-8 flex flex-col space-y-4'>
      <InputField id='email' type='email' placeholder='Enter you email' label='Email' />
      <InputField id='password' type='password' placeholder='Enter you password' label='password' />
      {formType ==='signUp' && (
        <InputField id='confirmPassword' type='password' placeholder='Confirm you password' label='Confirm Password' />
      )}
      </div>
      <div className='flex flex-col-reverse space-y-2 pt-2 sm:flex-row sm:space-x-2 sm:space-y-0'>
        <button
          className='flex w-full items-center justify-center rounded-lg 
          bg-red-500 px-4 py-2 hover:bg-red-600 text-sm font-semibold text-white sm:w-auto sm:px-8'
          type='submit'>
          {formType === 'signIn'? 'SignIn' : 'SignUp'}
        </button>
      </div>
    </form>
  )
}