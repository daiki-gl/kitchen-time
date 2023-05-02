import { supabase } from '@/lib/supabaseClient'
import { useSession } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useSelector } from 'react-redux'

// export const fetchLoginUser = async(id:string) => {
//     const {data, error} = await supabase
//         .from('users')
//         .select()
//         .eq('id', id)

//         if(error) console.log(error);
//         console.log(data);

//         return data
// }

const Header = () => {
    const {pathname, query: {id}, back} = useRouter()
    const [header, setHeader] = useState('')
    // const session = useSession()
    const avatar = useSelector(state => {
        if(state.users.user !== null) {
            return state.users.user[0]?.avatar
        }
        })
        
        useEffect(() => {
       switchHeader(pathname)
    },[pathname])

    const switchHeader = (pathname:string) => {
        switch (pathname) {
            case '/search/recipe':
                return setHeader('Search Recipe')
            case '/search/user':
                return setHeader('Search User')
            case '/recipe/[id]':
                return setHeader(String(id).toUpperCase())
            case '/profile/[id]':
                return setHeader(String(id))
            case '/bookmark-list':
                return setHeader("Bookmark List")
            case '/recipe/create':
                return setHeader("Create Recipe")
            default:
                return setHeader("");
        }
    }

  return (
    <header className='header flex justify-between items-center bg-primaryColor py-2 px-5 fixed w-screen top-0 z-50 md:hidden'>
        {pathname === '/' && (
        <h1>
          <Image src={`/images/logo.png`} alt='Kitchen Time' width={150} height={70} />
        </h1> 
        )}
        {header && (<Link className="font-bold" href={'/'}><MdArrowBackIosNew className="inline-block" />{header}</Link>)}
        <Link href={`/profile/`} className='rounded-full h-[40px] w-[40px] border border-white'>
            
            {/* Gives me an error when I use if statement inside Image src. */}
            {avatar ? (
                <Image src={avatar} alt='username' width={40} height={40} className="rounded-full w-full h-full object-cover" />
                ) : (
                <Image src='/images/Guest.jpg' alt='username' width={40} height={40} className="rounded-full w-full h-full object-cover" />
            )}
        </Link>
    </header>
  )
}

export default Header