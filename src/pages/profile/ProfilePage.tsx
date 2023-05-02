import Tabs from '@/components/Tabs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Settings from '@/components/Settings'
import RecipeList from '@/components/RecipeList'
import { useDispatch, useSelector } from 'react-redux'
import { supabase } from '@/lib/supabaseClient'
import Cover from '@/components/Cover'
import Avatar from '@/components/Avatar'
import { getLoginUser } from '@/redux/middleware/api'

type ImageFile = {
  name: string,
}

export type ProfilePageProps = {
  isEdit: boolean
}

const ProfilePage = () => {
    const {query} = useRouter()
    const {id, name, bio,} = useSelector((state) => state.users.user[0])
    const loginUser = useSelector((state) => state.users)

    console.log(loginUser);

    const [isEdit, setIsEdit] = useState(false)
    const bioRef = useRef()
    const nameRef = useRef()
    const dispatch = useDispatch()
    const [saved, setSaved] = useState(false)

    if(query?.tab === undefined) query.tab = Array('recipe');

    const updateProfile = async() => {
      const {error} = await supabase.from('users')
      .update({
        bio: bioRef.current.value,
        name: nameRef.current.value
      })
      .eq('id', id)
      .select()

      setSaved(false)

        if(error) console.log(error);
        setIsEdit(false)
        setSaved(true)
    }

    useEffect(() => {
      dispatch(getLoginUser(id))
    },[saved])


  return (
    <div className="min-h-screen pt-14 pb-24 mx-auto md:ml-[68px] md:pt-5 lg:ml-80">

      <div className="relative overflow-hidden text-sm bg-white md:mx-5 md:rounded-lg lg:mx-24">
        <Cover isEdit={isEdit} setIsEdit={setIsEdit} />

          <Avatar isEdit={isEdit} setIsEdit={setIsEdit} />

        <div className="px-5 mt-16 mb-5">
          <div className="flex justify-between items-center">
            {isEdit ? (
              <input 
              type="text"
              ref={nameRef}
              defaultValue={name}
              className='bg-white border p-1'
              />
              ):(
                <h3 className="text-lg font-bold">{name}</h3>
            )}

            {isEdit ? (
              <div className='flex flex-col'>
                <button 
                onClick={() => updateProfile()}
                className="btn btn-sm px-5 bg-white border-accentColor border-2 text-font-color hover:bg-accentColor hover:text-white hover:border-accentColor mb-2">Save Profile</button>
                <button 
                onClick={() => setIsEdit(false)}
                className="btn btn-sm px-5 bg-white border-primaryColor border-2 text-font-color hover:bg-primaryColor hover:text-white hover:border-primaryColor">Cancel </button>
              </div>
              ) : (
              <button 
              onClick={() => setIsEdit(true)}
              className="btn btn-sm px-5 bg-white border-primaryColor border-2 text-font-color hover:bg-primaryColor hover:text-white hover:border-primaryColor">Edit</button>
            )}
          </div>

          <div>
            <Link className='mr-4 text-xs' href="/follows" >12 Followings</Link>
            <Link className='text-xs' href="/followers" >39 Followers</Link>
          </div>

          <div className="mt-3 mb-5">
            {isEdit ? (
              <textarea
              ref={bioRef} 
              defaultValue={bio}
              className='bg-white mt-1 w-full p-2 border'
              />
              ): (
                <p>{bio}</p>
            )}
          </div>
        </div>

            <Tabs active={query.tab[0]} userId={name} />

        </div>

        <div className='container mx-auto'>
        {query.tab[0] === "bookmark-list"  && (
            <RecipeList />
        )}


        {query.tab[0] === "recipe"  && (
            <RecipeList />
        )}

        {query.tab[0] === "settings"  && (
            <Settings />
        )}
        </div>
    </div>
  )
}

export default ProfilePage