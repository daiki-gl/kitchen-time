import { useEffect } from 'react'
import { useRouter } from 'next/router'
import FadeLoader from "react-spinners/FadeLoader";

import SearchBox from '@/components/SearchBox'
import {RecipeData } from '@/types/type';
import useGetData from '@/hooks/useGetData';
import { supabase } from '@/lib/supabaseClient';
import { store } from '@/redux/store';
import { getRecipes } from '@/redux/middleware/api';
import HomePage from '@/components/Home/HomePage';

export default function Home({data}:any) {
  const { user, loadingUser ,recipes, loadingRecipes: loading } = useGetData()
  const { push } = useRouter()
  
  useEffect(() => {
    if(loadingUser !== 'pending') {
      (!user) && push('/login')
    }
    // console.log({data});
  },[user])

  return (
    <div className='min-h-screen pt-16 pb-20 md:ml-[68px] md:pt-5 lg:ml-80'>
    {user &&
    <>
      <SearchBox />
      <HomePage data={data} />
     </>
    }
    </div>
  )
}


export const getServerSideProps = async() => {
    const {data, error} = await supabase
            .from('recipes')
            .select('*, users(id, name, avatar, bio, cover_image)')
            
            if(error){
                console.log(error);
                return []
            }
    return {props: {data}}
}
