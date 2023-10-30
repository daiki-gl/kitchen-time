import useGetLoginUser from '@/hooks/useGetData'
import useHeaderTitleSwitcher from '@/hooks/useHeaderTitleSwitcher'
import { supabase } from '@/lib/supabaseClient'
import { getLoginUser } from '@/redux/middleware/api'
import { AppDispatch, RootState } from '@/redux/store'
import { User } from '@/types/type'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
    const {pathname, query} = useRouter()
    const [header, setHeader] = useState('')
    const {switchHeader} = useHeaderTitleSwitcher()
    // const user = useSelector<RootState>(state => (state.users.user !== null) && state.users?.user[0]) as User
    // const dispatch = useDispatch<AppDispatch>()

    const user:any = useGetLoginUser()

    useEffect(() => {
       setHeader(switchHeader(pathname, query))
    },[pathname,query,switchHeader])

    // useEffect(() => {
    //   dispatch(getLoginUser(user.id))
    // },[user])

  return (
    <header className='header flex justify-between items-center bg-primaryColor py-2 px-5 fixed w-screen top-0 z-50 md:hidden'>
        {pathname === '/' && (
        <h1>
          <Image src={`/images/logo.png`} alt='Kitchen Time' width={150} height={70} />
        </h1> 
        )}
        {header && (<Link className="font-bold" href={'/'}><MdArrowBackIosNew className="inline-block" />{header}</Link>)}
        {
        user && (
            <Link 
                href={{
                    pathname:`/profile/${user.id}`,
                    // query: { 
                    // ...user,
                    // }
                    }}
                    // as={`/profile/${(user.id)}`}
                className='rounded-full h-[40px] w-[40px] border border-white'
            >
                    <Image src={user.avatar ? user.avatar : '/images/Guest.jpg'} alt='username' width={40} height={40} className="rounded-full w-full h-full object-cover" />
            </Link>
            )
        }
    </header>
  )
}

export default Header