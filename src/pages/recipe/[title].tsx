import RecipePage from '@/components/Recipe/RecipePage'
import { directionType, ingredientsType } from '@/components/RecipeForm'
import { supabase } from '@/lib/supabaseClient'
import { RecipeData } from '@/types/type'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'


export type RecipePageProps = {
    data: {
      id: string;
      created_at: string;
      title: string;
      thumbnail: string;
      serves: string;
      ingredients: ingredientsType;
      directions: directionType;
      tips: string;
      user_id: string;
      recipeId: string;
    }
  }

const Recipe = ({data}:{data:RecipeData}) => {
  return (
    <RecipePage data={data} />
  )
}

export default Recipe

export async function getServerSideProps (context:GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
  const {data, error} = await supabase
              .from('recipes')
              .select('*, users(id, name, avatar, bio, cover_image)')
              .eq('id', context.params && context.params.title)
              .single()
              
              if(error){
                  console.log(error);
                  return []
              }

              const recipeData = data as RecipeData
  return {
      props: { data: recipeData }
  }
}