import Tabs from '@/components/Tabs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProfilePage from './ProfilePage'
import { supabase } from '@/lib/supabaseClient'
import { User } from '@/types/type'
import { GetStaticProps, GetStaticPropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'

export type userPropsType = {
  data: User[]
}

const UserProfile = ({data}:{data:User[]}) => {
  return (
    <ProfilePage data={data} />
  )
}

export default UserProfile

export async function getStaticPaths() {
  const {data, error} = await supabase
    .from('users')
    .select()
    
    if(error){
            console.log(error);
            return []
    }

  const allPaths = data.map((user) => {
    return {
      params: {
        id: user.id.toString(),
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context:GetStaticPropsContext<ParsedUrlQuery, PreviewData>) {
  const {data, error} = await supabase
    .from('users')
    .select()
    
    if(error){
            console.log(error);
            return []
    }

    const userData = data.filter(data => data.id ===  context.params?.id) as User[]

  return {props: {data: userData}}
}