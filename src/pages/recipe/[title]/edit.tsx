import SearchInput from '@/components/SearchInput';
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { RecipePageProps } from '.';
import RecipeForm from '@/components/RecipeForm';

const Edit = ({data:recipe}:RecipePageProps) => {
  const [item, setItem] = useState<RecipePageProps | null>(null)

  useEffect(() => {
    setItem(recipe)
  },[recipe])


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

export async function getServerSideProps  (context:any) {
  console.log(context.query) 
  return {
      props: { 
         data: context.query
      }
  }
}