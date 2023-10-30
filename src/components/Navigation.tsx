import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdPersonSearch, MdOutlineFoodBank } from 'react-icons/md'
import { BsBookmarkStar } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { useSession } from '@supabase/auth-helpers-react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, unsetUser } from '@/redux/slice/UserSlice'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'

const Navigation = () => {
  // const session = useSession()
  const dispatch = useDispatch()
  const {push, pathname} = useRouter()
  const user = useSelector(selectUser)

  // console.log({user});

  const handleLogout = () => {
    push('/login').finally( async() =>{
      dispatch(unsetUser())
      const { error } = await supabase.auth.signOut()
      if (error) return console.error(error)
      // console.log('>>>>>>>>>',user);
    })
  }


  return (
    <nav className="bg-primaryColor py-3 px-5 fixed bottom-0 w-screen md:left-0 md:w-auto md:top-0 md:py-10 lg:max-w-xs lg:w-full z-50">
      {user && (
        <ul className="nav-list flex items-center justify-between text-white md:flex-col md:h-full">

          <li className='hidden w-5 h-[80px] mb-10 lg:block lg:w-full'>
            <Image className='h-full object-contain' src={'/images/logo.png'} alt='Kitchen Time' width={280} height={80} />
          </li>

          <li className='w-5 h-5 md:mb-5 md:w-7 md:h-7 lg:w-full'>
            <Link href="/" className='block w-full h-full md:inline-block lg:w-auto text-white'>
              <AiOutlineHome className='w-full h-full md:inline-block md:w-auto' />
              <span className="hidden lg:inline-block ml-3">HOME</span>
            </Link>
          </li>
          <li className='w-5 h-5 md:mb-5 md:w-7 md:h-7 lg:w-full'>
            <Link href="/search/recipe" className='block w-full h-full  md:inline-block lg:w-auto text-white'>
              <AiOutlineSearch className='w-full h-full  md:inline-block md:w-auto' />
              <span className="hidden lg:inline-block ml-3">Search Recipe</span>
            </Link>
          </li>
          <li className='w-[35px] h-[35px] md:mb-5 md:w-7 md:h-7 lg:w-full'>
            <Link href="/recipe/create" className='block w-full h-full  md:inline-block lg:w-auto text-white' >
              <MdOutlineFoodBank className='w-full h-full  md:inline-block md:w-auto' />
              <span className="hidden lg:inline-block ml-3">Create Recipe</span>
            </Link>
          </li>
          <li className='w-5 h-5 md:mb-5 md:w-7 md:h-7 lg:w-full'>
            <Link href="/search/user" className='block w-full h-full  md:inline-block lg:w-auto text-white'>
              <MdPersonSearch className='w-full h-full  md:inline-block md:w-auto' />
              <span className="hidden lg:inline-block ml-3">Search User</span>
              </Link>
            </li>
          <li className='w-5 h-5 md:mb-5 md:w-7 md:h-7 lg:w-full'>
            <Link href={{
                pathname:`/profile/${user.id}/bookmark-list`,
                query: { 
                  ...user,
                  }
                }}
                as={`/profile/${(user.id)}/bookmark-list`}
                className='block w-full h-full  md:inline-block lg:w-auto text-white'
                >
              <BsBookmarkStar className='w-full h-full  md:inline-block md:w-auto' />
              <span className="hidden lg:inline-block ml-3">Bookmarks</span>
            </Link>
          </li>

          <li className='hidden md:block w-5 h-5 md:mb-5 md:w-7 md:h-7 lg:w-full'>
            <Link href={{
                pathname:`/profile/${user.id}`,
                query: { 
                  ...user,
                  }
                }}
                as={`/profile/${(user.id)}`}
                className='block w-full h-full  md:inline-block lg:w-auto text-white'
                >
                <Image 
                  src={`${user.avatar ? user.avatar : '/images/Guest.jpg'} `}
                  alt='username' 
                  width={40} 
                  height={40} 
                  className="rounded-full w-full h-full object-cover inline-block lg:w-[30px] lg:h-[30px] pointer-events-none" />
              <span className="hidden lg:inline-block ml-3">Profile</span>
            </Link>
          </li>
          <li className='hidden md:block w-5 h-5 mt-auto md:w-7 md:h-7 lg:w-full'>
            <button onClick={handleLogout} className='hidden w-full h-full  md:inline-block lg:w-auto text-white'>
              <FiLogOut className='w-full h-full  md:inline-block md:w-auto' />
              <span className="hidden lg:inline-block ml-3">Logout</span>
            </button>
          </li>
        </ul>
      )}
      </nav>
  )
}

export default Navigation