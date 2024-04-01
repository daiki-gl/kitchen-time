import useHeaderTitleSwitcher from '@/hooks/useHeaderTitleSwitcher'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/slice/UserSlice'

const DEFAULT_URL = '/images/Guest.jpg'

const Header = () => {
    const {pathname, query: {name , title}} = useRouter()
    const [header, setHeader] = useState('')
    const {switchHeader} = useHeaderTitleSwitcher()
    const user = useSelector(selectUser)
    const [url, setUrl] = useState<string>(DEFAULT_URL)

    useEffect(() => {
      user && user.avatar && setUrl(user.avatar)
     },[user])

    useEffect(() => {
      console.log('Query', name, title)
       setHeader(switchHeader(pathname, String(name), String(title)))
    },[pathname])

    useEffect(() => {
      user && user.avatar && setUrl(user.avatar)
     },[user])

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
              pathname:`/profile/${user.id}/recipe`,
              query: { 
                ...user,
                }
              }}
              as={`/profile/${(user.id)}/recipe`}
                className='relative rounded-full h-[40px] w-[40px] border border-white'
            >
               <Image 
                  src={url}
                  alt='username' 
                  width={40} 
                  height={40} 
                  className="rounded-full w-full h-full object-cover inline-block lg:w-[30px] lg:h-[30px] pointer-events-none" />
            </Link>
            )
        }
    </header>
  )
}

export default Header