import { supabase } from '@/lib/supabaseClient';
import { getLoginUser } from '@/redux/middleware/api';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Avatar from './Avatar';
import Cover from './Cover';
import { User } from '@/types/type';
import { RootState } from '@/redux/store';

const ProfileInfo = ({userData}:{userData:User}) => {
    const user = useSelector((state:RootState) => state.persistedReducer.users?.user?.[0]);
    const loginUserId = user?.id

    const [isEdit, setIsEdit] = useState(false)
    const bioRef = useRef<HTMLTextAreaElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const router = useRouter()

    const updateProfile = async() => {
      const {data, error} = await supabase.from('users')
      .update({
        bio: bioRef.current?.value,
        name: nameRef.current?.value
      })
      .eq('id', loginUserId)
      .select()


        if(error) console.log(error);
        setIsEdit(false)

       data && router.replace({
          pathname:router.asPath,
          query: {...data[0]},
        }, `/profile/${loginUserId}`)
    }

  return (
    <>
    <Cover isEdit={isEdit} setIsEdit={setIsEdit} cover_image={userData.cover_image} userId={userData.id} />
    <Avatar isEdit={isEdit} setIsEdit={setIsEdit} avatar={userData.avatar} userId={userData.id} />
    {/* <Cover isEdit={isEdit} setIsEdit={setIsEdit} cover_image={userData.cover_image} id={userData.id} />
    <Avatar isEdit={isEdit} setIsEdit={setIsEdit} avatar={userData.avatar} id={userData.id} /> */}
    
    <div className="px-5 mt-16 mb-5">
          <div className="flex justify-between items-center">
            {isEdit ? (
              <input 
              type="text"
              ref={nameRef}
              defaultValue={userData.name}
              className='bg-white border p-1'
              />
              ):(
                <h3 className="text-lg font-bold">{userData.name}</h3>
            )}
            {userData.id === loginUserId && isEdit && (
              <div className='flex flex-col'>
                <button 
                onClick={() => updateProfile()}
                className="btn btn-sm px-5 bg-white border-accentColor border-2 text-font-color hover:bg-accentColor hover:text-white hover:border-accentColor mb-2">Save Profile</button>
                <button 
                onClick={() => setIsEdit(false)}
                className="btn btn-sm px-5 bg-white border-primaryColor border-2 text-font-color hover:bg-primaryColor hover:text-white hover:border-primaryColor">Cancel </button>
              </div>
              )} 
              {userData.id === loginUserId && !isEdit &&  (
              <button 
              onClick={() => setIsEdit(true)}
              className="btn btn-sm px-5 bg-white border-primaryColor border-2 text-font-color hover:bg-primaryColor hover:text-white hover:border-primaryColor">Edit</button>
            )}

              {/* Future improvement */}
            {/* {userData.id !== loginUserId && (
              <div className='flex flex-col'>
                <button 
                onClick={() => console.log('follow')}
                className="btn btn-sm px-5 bg-white border-accentColor border-2 text-font-color hover:bg-accentColor hover:text-white hover:border-accentColor mb-2">Follow</button>
              </div>
              )}  */}
          </div>

            {/* Future improvement */}
          {/* <div>
            <Link className='mr-4 text-xs' href="/follows" >12 Followings</Link>
            <Link className='text-xs' href="/followers" >39 Followers</Link>
          </div> */}

          <div className="mt-3 mb-5">
            {isEdit ? (
              <textarea
              ref={bioRef} 
              defaultValue={userData.bio}
              className='bg-white mt-1 w-full p-2 border'
              />
            ):(
              <p className='whitespace-pre-wrap'>{userData.bio}</p>
            )}
          </div>
        </div>
        </>
  )
}

export default ProfileInfo