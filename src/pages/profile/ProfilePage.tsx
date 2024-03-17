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
import ProfileInfo from '@/components/ProfileInfo'

type ImageFile = {
  name: string,
}

export type ProfilePageProps = {
  isEdit: boolean,
  setIsEdit: any, 
  cover_image?: string, 
  userId: string
  avatar?: string
}

const ProfilePage = ({data}:{data:any}) => {
    const {query} = useRouter()
    console.log({query});

    if(query?.tab === undefined || null) query.tab = Array('recipe');


  return (
    <div className="min-h-screen pt-14 pb-24 mx-auto md:ml-[68px] md:pt-5 lg:ml-80">

      <div className="relative overflow-hidden text-sm bg-white md:mx-5 md:rounded-lg lg:mx-24">
        
        <ProfileInfo userData={data[0]} />

            <Tabs userData={data[0]} active={query.tab[0]} />

        </div>

        <div className='container mx-auto'>
        {query.tab[0] === "bookmark-list"  && (
            <RecipeList userData={data[0]} />
        )}


        {query.tab[0] === "recipe"  && (
            <RecipeList userData={data[0]} />
        )}

        {query.tab[0] === "settings" && (
            <Settings />
        )}
        </div>
    </div>
  )
}

export default ProfilePage