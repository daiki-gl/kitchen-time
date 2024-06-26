import { config } from '@/config'
import { supabase } from '@/lib/supabaseClient'
import { getLoginUser } from '@/redux/middleware/api'
import { RootState } from '@/redux/store'
import { User } from '@/types/type'
import { ThunkDispatch } from '@reduxjs/toolkit'

import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import FadeLoader from 'react-spinners/FadeLoader'

const DEFAULT_URL = '/images/Guest.jpg'

type AvatarType = {
  isEdit: boolean,
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
  avatar?: string,
  userId: string
}

const Avatar = ({isEdit, setIsEdit, avatar, userId}: AvatarType) => {
    const user = useSelector((state: RootState) => state.persistedReducer.users.user?.[0]);
    const [editing, setEditing] = useState(false)
    const [url, setUrl] = useState(avatar || DEFAULT_URL)
    const dispatch = useDispatch<ThunkDispatch<RootState,string, any>>()
    // const dispatch = useDispatch()
    const {asPath} = useRouter()

    useEffect(() => {
      if(userId === user?.id) {
        dispatch(getLoginUser((user.id)))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[url])

      useEffect(() => {
        setUrl(avatar || DEFAULT_URL)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[asPath])

    const updateCover = async(e:React.ChangeEvent<HTMLInputElement>) => {
        setEditing(true)
        const file = e.target.files?.[0];
        if(file) {
          const newName = Date.now() + file.name;
        const { data, error } = await supabase.storage.from('avatar').upload(newName, file)

          if(error) console.log(error);
  
           if(data) {
            const url = config.supabase_url + `/storage/v1/object/public/avatar/` + data.path;
             const {error} = await supabase.from('users')
              .update({'avatar': url})
              .eq('id', user?.id)
              .select()
  
              if(error) console.log(error);

              setUrl(url)
              setEditing(false)
            }
        }
        setIsEdit(false)
      }
  return (
    <div className="absolute top-24 left-5 md:top-44">
        <div className="relative w-24 h-24 md:w-28 md:h-28">
            {editing ? (
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <FadeLoader color="#ED6C24" />
                </div>
                
            ): (
                <Image
              src={url}
              alt=''
              width={80}
              height={80}
              className='rounded-full w-24 h-24 object-cover shadow-xl md:w-28 md:h-28 pointer-events-none'
            />
            )}
            
            {isEdit && (
                <>
                    <label htmlFor="avatar">
                        <AiOutlineCamera className='p-2 cursor-pointer absolute -bottom-1 right-0 w-10 h-10 rounded-full bg-accentColor text-white' />
                    </label>
                    <input 
                    type="file" 
                    name="avatar" 
                    id="avatar" 
                    className='hidden'  
                    onChange={updateCover}
                />
                </>
                
            )}
        </div>
    </div>
  )
}

export default Avatar