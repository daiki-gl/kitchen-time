import React from 'react'
import ProfilePage from '../ProfilePage'
import { supabase } from '@/lib/supabaseClient'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { User } from '@/types/type'

const Profile = ({data}:{data:User[]}) => {
  return (
    <>
    <ProfilePage data={data} />
    </>
  )
}

export default Profile

export const getServerSideProps = async(context:GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const {data, error} = await supabase
    .from('users')
    .select().eq('id', context.query.id)
    
    if(error){
            console.log(error);
            return []
    }
  return {props: {data}}
}