import React from 'react'
import RecipeCard from '../RecipeCard'
import FadeLoader from "react-spinners/FadeLoader";
import useGetData from '@/hooks/useGetData';
import { RecipeData } from '@/types/type';
import { propsType } from '@/pages';

const HomePage = (props:propsType) => {
    const { loadingRecipes: loading } = useGetData()
  return (
    <section className="recipes">
    <div className="container px-5 mx-auto lg:grid lg:grid-cols-2 gap-5">
        {String(loading) !== 'pending' && props.data ? 
          props.data.map((recipe: RecipeData) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
        )) : (
            <FadeLoader className='mx-auto' color="#ED6C24" />
        )}
    </div>
  </section>
  )
}

export default HomePage