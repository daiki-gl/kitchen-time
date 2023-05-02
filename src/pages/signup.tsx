import { supabase } from '@/lib/supabaseClient'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'


const SignUp = () => {
  const [schema, setSchema] = useState<any>(null)
  const {register, handleSubmit, formState: { errors, isSubmitting}} = useForm({
    resolver: zodResolver(schema)
  })

  const { push } = useRouter();

  useEffect(() => {
    setSchema(z.object({
      username: z.string()
            .min(1,{message: 'Please enter a valid username'}).max(20),
      email: z.string()
            .email({ message: 'Please enter a valid email' }),
      password: z
            .string()
            .min(1, { message: 'Please enter a valid password' })
            .max(50),
            ...(window.location.pathname === "/signup" && {
              confirmPassword: z
                  .string()
                  .min(1, { message: 'Please enter a valid password' })
                  .max(50)
          })
    }))
  },[])

  const handleSignUp = async(formData:any) => {
  const {data: {session}, error} =  await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if(error) console.log(error);
    
    if(session) {
      console.log(session);
        const {data, error} = await supabase
        .from('users')
        .insert({
          id: session.user.id,
          name: formData.username,
        })
        .select()
        
        if(error) console.log(error);

       data && push('/login')
    }
  }


  return (
    <div className='mx-auto px-3 bg-sign-up-bg bg-cover h-screen'>

    <div className="container flex h-full items-center justify-center flex-col md:items-end">
      <div className="py-6 px-5 rounded-xl text-white bg-primaryColor max-w-md">

        <h1 className='logo bg-primaryColor h-[100px] mb-5'>
          <Image className='mx-auto h-full object-contain' src={'/images/logo.png'} alt='Kitchen Time' width={500} height={150} />
        </h1>

      <h3 className="text-3xl text-center font-bold mb-4">Sign up</h3>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor="username">Username</label>
          <input 
                 type="text" 
                 id='username'
                 className='rounded-full w-full p-2 bg-white text-font-color'
                 autoComplete="new-username"
                required
                 {...register('username')}
                 />
            {errors.username && <p className='text-error'>{errors.username.message}</p>}
        </div>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor="username">email</label>
          <input 
                 type="email" 
                 id='email'
                 className='rounded-full w-full p-2 bg-white text-font-color'
                 autoComplete="new-email"
                 required
                 {...register('email')}
                 />
            {errors.email && <p className='text-error'>{errors.email.message}</p>}
        </div>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor="password">Password</label>
          <input 
                 type="password" 
                 id='password'
                 className='rounded-full w-full p-2 bg-white text-font-color'
                 autoComplete="new-password"
                 required
                 {...register('password')}
                 />
            {errors.password && <p className='text-error'>{errors.password.message}</p>}
        </div>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor="password">Password(confirm)</label>
          <input 
                 type="password" 
                 id='confirmPassword'
                 className='rounded-full w-full p-2 bg-white text-font-color'
                 autoComplete="new-password"
                 required
                 {...register('confirmPassword')}
                 />
          {errors.confirmPassword && <p className='text-error'>{errors.confirmPassword.message}</p>}
        </div>
        <div className='mb-4'>
          <button 
          className={`btn btn-block rounded-full bg-white btn-outline text-primaryColor font-bold hover:bg-primaryColor hover:text-white hover:border-white
          ${isSubmitting ? 'loading' : ''}`}>
            Sign up
          </button>
        </div>

        <p className="my-4 text-center">Or</p>

        <div className='mb-4'>
          <button className="btn btn-block rounded-full bg-white btn-outline text-primaryColor font-bold hover:bg-primaryColor hover:text-white hover:border-white">Login with Google</button>
        </div>
        
      </form>

      <div className="text-center text-sm">
        <p>Already have an account?&nbsp;&nbsp;<Link href="/login" className="border-b font-semibold" >Login</Link></p>
      </div>

      </div>
    </div>
    </div>
  )
}

export default SignUp