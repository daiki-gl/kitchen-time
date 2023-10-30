import Tabs from '@/components/Tabs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProfilePage from './ProfilePage'
import { supabase } from '@/lib/supabaseClient'

const UserProfile = ({data}:{data:any}) => {
  return (
    <ProfilePage data={data} />
  )
}

export default UserProfile

// export const getServerSideProps = async(context:any) => {
//   return {props: {data: context.query}}
// }

export async function getStaticPaths() {
  const {data, error} = await supabase
    .from('users')
    .select()
    
    if(error){
            console.log(error);
            return []
    }

  const allPaths = data.map((user) => {
    // console.log('user id::::::::::',user.id);
    return {
      params: {
        id: user.id.toString(),
      },
    };
  });
  // console.log('>>>>>>>>>>>',allPaths);
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context:any) {
  // console.log(context.params.id);
  const {data, error} = await supabase
    .from('users')
    .select()
    
    if(error){
            console.log(error);
            return []
    }

    const userData = data.filter(data => data.id === context.params.id)

  return {props: {data: userData}}
}

// export async function getStaticProps(context) {
//   return {props: {data: context.query}}
// }
