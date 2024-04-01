import CredentialForm from '@/components/CredentialForm'
import Image from 'next/image'
import Link from 'next/link'

const Login = () => {

  return (
    <div className='mx-auto px-3 bg-login-bg bg-cover h-screen'>
      <div className="container flex h-full items-center justify-center flex-col md:items-end">
        <div className="py-6 px-5 rounded-xl text-white bg-primaryColor max-w-md">

          <h1 className='logo bg-primaryColor h-[100px] mb-5'>
            <Image className='mx-auto h-full object-contain' src={'/images/logo.png'} alt='Kitchen Time' width={500} height={150} />
          </h1>
           <h3 className="text-3xl text-center font-bold mb-4">Login</h3>
           <CredentialForm />

          <div className="text-center text-sm">
            <p>Not have an account?&nbsp;&nbsp;<Link href="/signup" className="border-b font-semibold" >Sign up</Link></p>
          </div>
          
        </div>
      </div>
    </div>
  )
}
  export default Login