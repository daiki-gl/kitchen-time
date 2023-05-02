import { config } from '@/config'
import { supabase } from '@/lib/supabaseClient'
import { ProfilePageProps } from '@/pages/profile/ProfilePage'
import { getLoginUser } from '@/redux/middleware/api'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import FadeLoader from 'react-spinners/FadeLoader'

const Avatar = ({isEdit, setIsEdit}: ProfilePageProps) => {
    const {id, avatar} = useSelector((state) => state.users.user[0])
    const [editing, setEditing] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLoginUser(id))
      },[editing])

    const updateCover = async(e:React.ChangeEvent<HTMLInputElement>) => {
        setEditing(true)
        const file:any = e.target.files?.[0];
        if(file) {
          const newName = Date.now() + file.name;
          console.log('hellohello');
        const { data, error } = await supabase.storage.from('avatar').upload(newName, file)

          if(error) console.log(error);
  
           if(data) {
            const url = config.supabase_url + `/storage/v1/object/public/avatar/` + data.path;
             const {error} = await supabase.from('users')
              .update({'avatar': url})
              .eq('id', id)
              .select()
  
              if(error) console.log(error);

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
              src={`${avatar ? avatar : '/images/Guest.jpg'}`}
              alt=''
              width={80}
              height={80}
              className='rounded-full w-24 h-24 object-cover shadow-xl md:w-28 md:h-28'
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