import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsBookmarkPlus } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import SearchBox from '@/components/SearchBox'
import { getRecipes } from '@/redux/middleware/api'
import FadeLoader from "react-spinners/FadeLoader";
import { useRouter } from 'next/router'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { supabase } from '@/lib/supabaseClient'

export type RecipeData = {
  id: number,
  title: string,
  thumbnail: string,
  serves: number,
  ingredients: JSON,
  directions: JSON,
  tips: string,
  user_id: string,
}

type RecipeState = {
  recipe: {
    recipe: RecipeData
  }
}

export default function Home() {
  // any???
  const {recipes, loading}:any = useSelector((state:RecipeState) => state.recipe)
  const dispatch = useDispatch<any>()
  const user = useSelector(state => state.users.user)
  // const supabaseClient = useSupabaseClient();
  const { push } = useRouter()

//  async function getSession() {
//   const {data} = await supabase.auth.getSession()
//   return data
//   }

  useEffect(() => {
    dispatch(getRecipes())
  },[dispatch])
  
  useEffect(() => {
    if(!user) {
      push('/login')
    } 
  },[push,user])

  return (
    <div className='min-h-screen pt-16 pb-20 md:ml-[68px] md:pt-5 lg:ml-80'>
    {user &&
      <>
    <SearchBox />
      <section className="recipes">
        <div className="container px-5 mx-auto lg:grid lg:grid-cols-2 gap-5">
            {loading !== 'pending' ? 
              recipes.map((recipe: RecipeData) => (
              <div className="recipe-box mb-6" key={recipe.id}>
              <Link href={{
                pathname:`/recipe/${recipe.title}`,
                query: { 
                  ...recipe,
                  ...recipe.users,
                  recipeId: recipe.id,
                  ingredients: JSON.stringify(recipe.ingredients), 
                  directions: JSON.stringify(recipe.directions),
                  }
                }}
                as={`/recipe/${(recipe.title)}`}
                >
                <div className="recipe-thumbnail h-[200px]">
                  <Image 
                    className='object-cover w-full h-full' 
                    src={recipe.thumbnail} 
                    width={300} 
                    height={200} 
                    loading='lazy'
                    alt='' />
                </div>
              </Link>
                <div className="recipe-info bg-primaryColor p-3">
                  <div className='flex justify-between mb-2'>
                    <Link href={`/recipe/${recipe.title}`} >
                      <h3 className="text-xl font-bold text-white">{recipe.title}</h3>
                    </Link>
                    <button><BsBookmarkPlus/></button>
                  </div>
                  <Link 
                    href={`/profile/${recipe.users.name}`} 
                    >
                    <Image 
                      src={`${recipe.users.avatar ? recipe.users.avatar : '/images/Guest.jpg'}`} 
                      width={20} 
                      height={20} 
                      loading='lazy'
                      alt='user'
                      className='inline-block mr-2 rounded-full w-7 h-7 object-cover border border-white'
                      />
                    <span className='text-sm text-white'>{recipe.users.name}</span>
                  </Link>
                </div>
            </div>
            )) : 
            (
              <FadeLoader className='mx-auto' color="#ED6C24" />
            )}
        </div>
      </section>
      </>
    }
    </div>
  )
}
