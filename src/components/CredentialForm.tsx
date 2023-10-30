import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import useAuth from '@/hooks/useAuth'
import { loginSchema, signUpSchema } from '@/schema/schema'
import CredentialInput from './CredentialInput'

export type CredentialFormData = {
    username?: string
    email: string;
    password : string
    confirmPassword?: string;
}

const CredentialForm = () => {
    const { pathname } = useRouter()
    const [schema, setSchema] = useState<any>(loginSchema)
    const {register, handleSubmit, formState: { errors , isSubmitting }} = useForm<CredentialFormData>({
    resolver: zodResolver(schema)
    })
    const { handleSignUp, handleLogin } = useAuth()
    const [loginError, setLoginError] = useState<any>(null)

    useEffect(() => {
        (pathname === '/signup') ? setSchema(signUpSchema) : setSchema(loginSchema)
    },[pathname])
    
    const onSubmit = async(data:CredentialFormData) => {
        (pathname === '/signup') ? handleSignUp(data) : handleLogin(data, setLoginError)
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
       {pathname === '/signup' && <CredentialInput
            title='Username'
            register={register}
            errors={errors}
            label='username'
        /> }

        <CredentialInput
            title='E-mail'
            register={register}
            errors={errors}
            label='email'
        />

        <CredentialInput
            title='Password'
            register={register}
            errors={errors}
            label='password'
            type='password'
        />

        {loginError && <p className='text-error -mt-4 mb-2'>{loginError}</p>}

       {pathname === '/signup' && <CredentialInput
            title='Password(confirm)'
            register={register}
            errors={errors}
            label='confirmPassword'
            type='password'
        /> }

        <div className='mb-4'>
          <button 
          className={`btn btn-block rounded-full bg-white btn-outline text-primaryColor font-bold hover:bg-primaryColor hover:text-white hover:border-white
          ${isSubmitting ? 'loading' : ''}`}>
           {pathname === '/login' ? 'Login' : 'Sign up'} 
          </button>
        </div>
        
      </form>
  )
}

export default CredentialForm