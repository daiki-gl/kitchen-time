import React from 'react'
import ProfilePage from '../ProfilePage'
import { supabase } from '@/lib/supabaseClient'

const Profile = ({data}:{data:any}) => {
  return (
    <>
    <ProfilePage data={data} />
    </>
  )
}

export default Profile

export const getServerSideProps = async(context:any) => {
  const {data, error} = await supabase
    .from('users')
    .select().eq('id', context.query.id)
    
    if(error){
            console.log(error);
            return []
    }
  return {props: {data}}
}