import RecipePage from '@/components/Recipe/RecipePage'
import { supabase } from '@/lib/supabaseClient'
import React from 'react'


export type RecipePageProps = {
    data: {
      id: string;
      created_at: string;
      title: string;
      thumbnail: string;
      serves: string;
      ingredients: string;
      directions: string;
      tips: string;
      user_id: string;
    }
  }

const Recipe = ({data}:RecipePageProps) => {
  return (
    <RecipePage data={data} />
  )
}

export default Recipe

export async function getServerSideProps  (context:any) {
  const {data, error} = await supabase
              .from('recipes')
              .select('*, users(id, name, avatar, bio, cover_image)')
              .eq('id', context.params.title)
              .single()

              console.log({data});
              
              if(error){
                  console.log(error);
                  return []
              }
  return {
      props: { data }
  }
}