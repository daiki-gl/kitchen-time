import { supabase } from '@/lib/supabaseClient'
import { selectUser, unsetUser } from '@/redux/slice/UserSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BiFoodMenu, BiLockOpen } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { MdAccountCircle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

const Settings = () => {
    const { push } = useRouter()
    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    const handleLogout = () => {
        push('/login').finally( async() =>{
          dispatch(unsetUser())
          const { error } = await supabase.auth.signOut()
          if (error) return console.error(error)
        })
      }
  return (
    <div className='flex flex-col gap-3 m-5 lg:lg:mx-24'>
                <Link href={'#'} className="text-font-color">
                    <MdAccountCircle className='inline-block mr-2 text-xl'/>
                    Account information
                </Link>
                <Link href={'#'} className="text-font-color">
                    <BiLockOpen className='inline-block mr-2 text-xl'/>
                    Change password
                </Link>
                <Link 
                href={{
                        pathname:`/profile/${user.id}/recipe`,
                        query: { 
                        ...user,
                        }
                        }}
                        as={`/profile/${(user.id)}/recipe`}
                 className="text-font-color" >
                    <BiFoodMenu className='inline-block mr-2  text-xl'/>
                    Your recipes
                </Link>
            <button className='inline-block text-left' onClick={handleLogout}>
                <FiLogOut className='inline-block mr-2  text-xl' />
                Logout
            </button>
            </div>
  )
}

export default Settings