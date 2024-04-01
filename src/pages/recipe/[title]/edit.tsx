import SearchInput from '@/components/SearchInput';
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

import RecipeForm from '@/components/RecipeForm';
import { RecipePageProps } from '../[title]';
import { data } from 'autoprefixer';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { RecipeData } from '@/types/type';

const Edit = ({data:recipe}:RecipePageProps) => {
  // const [item, setItem] = useState<RecipePageProps | null>(null)

  // useEffect(() => {
  //   setItem(recipe)
  // },[recipe])

  // useEffect(() => {
  //   console.log({recipe})
  // },[recipe])


  return (
    <div className="min-h-screen overflow-y-auto px-5 pt-14 pb-24 mx-auto md:ml-[68px] md:pt-5 lg:ml-80">

      <div className="container mb-5 max-w-full md:px-4 md:mx-auto">
        <SearchInput />
      </div>

      <RecipeForm item={recipe} />
  </div>
  )
}

export default Edit

export async function getServerSideProps  (context:GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
  const query = context.query.queryStr
  const recipe = JSON.parse(String(query))

  const {data, error} = await supabase
              .from('recipes')
              .select('*, users(id, name, avatar, bio, cover_image)')
              .eq('id', recipe.id)
              .single()

              console.log({data});
              
              if(error){
                  console.log(error);
                  return []
              }
  return {
      props: {data}
  }
}