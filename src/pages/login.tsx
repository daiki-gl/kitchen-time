import { supabase } from '@/lib/supabaseClient'
import { getLoginUser } from '@/redux/middleware/api'
import { setUser } from '@/redux/slice/UserSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as z from 'zod'

const schema = z.object({
  email: z.string()
        .email({ message: 'Please enter a valid email' }),
        password: z
        .string()
        .min(1, { message: 'Please enter a valid password' })
        .max(50),
      })

const Login = () => {
  const { push } = useRouter()
  const {register, handleSubmit, formState: { errors, isSubmitting}} = useForm({
    resolver: zodResolver(schema)
  })
  const dispatch = useDispatch()

  const handleLogin = async(formData:any) => {
  const {data: {session}, error} =  await supabase.auth.signInWithPassword({
      email: formData.email, 
      password: formData.password
    })

    if(error) console.log(error);


    console.log('login/',session);
    // session && push('/')

    if(session) {
      dispatch(setUser(session))
      dispatch(getLoginUser(session.user.id))
      push('/')
    }
  }

  return (
    <div className='mx-auto px-3 bg-login-bg bg-cover h-screen'>

    <div className="container flex h-full items-center justify-center flex-col md:items-end">
      <div className="py-6 px-5 rounded-xl text-white bg-primaryColor max-w-md">

        <h1 className='logo bg-primaryColor h-[100px] mb-5'>
          <Image className='mx-auto h-full object-contain' src={'/images/logo.png'} alt='Kitchen Time' width={500} height={150} />
        </h1>

      <h3 className="text-3xl text-center font-bold mb-4">Login</h3>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor="username">Email</label>
          <input
                 type="text" 
                 id='email'
                 className='rounded-full w-full p-2 bg-white text-font-color'
                 autoComplete='email'
                 {...register('email')}
                 />
                 {errors.email && <p className='text-danger'>{errors.email.message}</p>}
        </div>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor="password">Password</label>
          <input 
                 type="password" 
                 id='password'
                 className='rounded-full w-full p-2 bg-white text-font-color'
                 autoComplete='current-password'
                 {...register('password')}
                 />
                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
        </div>
        <div className='mb-4'>
          <button 
          className={`btn btn-block rounded-full bg-white btn-outline text-primaryColor font-bold hover:bg-primaryColor hover:text-white hover:border-white ${isSubmitting ? 'loading' : ''}`}>
            Login
            </button>
        </div>

        <p className="my-4 text-center">Or</p>

        <div className='mb-4'>
          <button className="btn btn-block rounded-full bg-white btn-outline text-primaryColor font-bold hover:bg-primaryColor hover:text-white hover:border-white">Login with Google</button>
        </div>
        
      </form>

      <div className="text-center text-sm">
        <p>Not have an account?&nbsp;&nbsp;<Link href="/signup" className="border-b font-semibold" >Sign up</Link></p>
      </div>

      </div>
    </div>
    </div>
  )
}

export default Login