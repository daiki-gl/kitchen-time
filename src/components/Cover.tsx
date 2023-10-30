import { config } from '@/config'
import { supabase } from '@/lib/supabaseClient'
import { ProfilePageProps } from '@/pages/profile/ProfilePage'
import { getLoginUser } from '@/redux/middleware/api'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import FadeLoader from 'react-spinners/FadeLoader'


const DEFAULT_URL = '/images/default_cover.jpg'

const Cover = ({isEdit, setIsEdit, cover_image, userId}: ProfilePageProps) => {
    const { id } = useSelector((state:any) => state.persistedReducer.users.user[0])
    // change these to Redux later
    const [url, setUrl] = useState(cover_image || DEFAULT_URL)
    const [editing, setEditing] = useState(false)
    const dispatch = useDispatch()
    const {asPath} = useRouter()

    useEffect(() => {
      if(userId === id) dispatch(getLoginUser(id))
    },[url])
    
    useEffect(() => {
        setUrl(cover_image || DEFAULT_URL)
      },[asPath])

    const updateCover = async(e:React.ChangeEvent<HTMLInputElement>) => {
        setEditing(true)
        const file:any = e.target.files?.[0];
        if(file) {
          const newName = Date.now() + file.name;
        const { data, error } = await supabase.storage.from('cover_image').upload(newName, file)
          if(error) console.log(error);
  
           if(data) {
            const url = config.supabase_url + `/storage/v1/object/public/cover_image/` + data.path;
             const {error} = await supabase.from('users')
              .update({'cover_image': url})
              .eq('id', id)
              .select()
  
              if(error) console.log(error);

              setUrl(url)
              setEditing(false)
           }
        }
        setIsEdit(false)
      }

  return (
    <div className='relative w-full h-40 overflow-hidden md:h-60'>
          <div className="w-full">
            {editing ? (
                <div className='absolute w-full h-full bg-gray-100'>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <FadeLoader color="#ED6C24" />
                    </div>
                </div>
            ): (
                <Image
                  src={url}
                  alt=''
                  width={300}
                  height={130}
                  className='w-full object-cover object-center h-40 md:h-60 pointer-events-none'
                  />
            )}
                {isEdit && (
                  <div className='absolute bottom-1 right-3 text-white p-2 rounded-full bg-accentColor'>
                    <label htmlFor="cover_image"
                           className='cursor-pointer text-3xl font-bold'><AiOutlineCamera /></label>
                    <input 
                      type="file" 
                      name="cover_image" 
                      id="cover_image" 
                      className='hidden'  
                      onChange={updateCover}
                    />
                  </div>
                )}
          </div>
        </div>
  )
}

export default Cover