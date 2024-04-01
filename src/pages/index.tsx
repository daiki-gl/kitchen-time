import { useEffect } from 'react'
import { useRouter } from 'next/router'

import SearchBox from '@/components/SearchBox'
import useGetData from '@/hooks/useGetData';
import { supabase } from '@/lib/supabaseClient';
import HomePage from '@/components/Home/HomePage';
import { RecipeData } from '@/types/type';
import { PostgrestError } from '@supabase/supabase-js';

export type propsType = {
  data: RecipeData[]
}

type serverProps = {
  error: PostgrestError | null,
  data: RecipeData[] | null
}

export default function Home(props:propsType) {
  const { user, loadingUser, loadingRecipes: loading } = useGetData()
  const { push } = useRouter()
  
  useEffect(() => {
    if(loadingUser !== 'pending') {
      (!user) && push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  return (
    <div className='min-h-screen pt-16 pb-20 md:ml-[68px] md:pt-5 lg:ml-80'>
    {user &&
    <>
      {/* <SearchBox /> */}
      <HomePage data={props.data} />
     </>
    }
    </div>
  )
}

export const getServerSideProps = async() => {
    const props:serverProps  = await supabase
            .from('recipes')
            .select('*, users(id, name, avatar, bio, cover_image)')
    const {data} = props

            if(props.error){
                console.log(props.error);
                return []
            }
    return {props: {data}}
}
