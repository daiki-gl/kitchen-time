import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RecipeList = ({userData}:any) => {
  // const { id } = useSelector(state => state.users.user[0])

  // const recipes = useSelector(state => state.recipe.recipes)
  const [recipes, setRecipes] = useState<any>(null)
  const [bookmarkRecipes, setBookmarkRecipes] = useState(null);

  const {query: {tab}}  = useRouter()

  const fetchRecipes = async() => {
    const {data, error} = await supabase.from('recipes')
      .select('*, users(id, name, avatar, bio, cover_image)')
      .eq('user_id', userData.id)

      if(error) console.log(error);

      setRecipes(data)
  }

  const fetchBookmarkedRecipes = async() => {
    const { data, error} = await supabase.from('bookmark')
      .select()
      .eq('user_id', userData.id)

      const bookmarkedIds = data.map(bookmarkItem => bookmarkItem.recipe_id)

      if(bookmarkedIds.length > 0) {
       const {data, error} = await supabase.from('recipes')
          .select('*, users(id, name, avatar, bio, cover_image)')
          .in('id', bookmarkedIds)

          if(error) console.log(error);
          setBookmarkRecipes(data)
      }

      if(error) console.log(error);
  }

  useEffect(() => {
    fetchBookmarkedRecipes()
    fetchRecipes()
  },[])
  
  // useEffect(() => {
  //   console.log(recipes);
  //   console.log(bookmarkRecipes);

  // },[recipes,bookmarkRecipes])

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 m-5 xl:grid-cols-4 lg:lg:mx-24">

        {recipes && tab[0] === 'recipe' && recipes.map((recipe:any) => (
            <div key={recipe.id} className="rounded-full w-full relative pt-[80%]">
              <Link 
              href={{
                pathname:`/recipe/${recipe.title}`,
                query: { 
                  ...recipe,
                  ... recipe.users,
                  recipeId: recipe.id,
                  ingredients: JSON.stringify(recipe.ingredients), 
                  directions: JSON.stringify(recipe.directions)
                  }
                }}
                as={`/recipe/${(recipe.title)}`}
               >
                <Image
                  src={`${recipe.thumbnail ? recipe.thumbnail : '/images/no-image-sm.jpg'}`}
                  alt=''
                  width={100}
                  height={100}
                  className='rounded-xl w-full h-full absolute top-0 object-cover'
                />
                <p className='-mt-9 px-3 py-2 rounded-b-xl text-white truncate ... bg-[#23151599] z-10 relative w-full text-sm'>{recipe.title}</p>
              </Link>
            </div>
        ))}

        {bookmarkRecipes && tab[0] === 'bookmark-list' && bookmarkRecipes.map((recipe:any) => (
            <div key={recipe.id} className="rounded-full w-full relative pt-[80%]">
              <Link 
              href={{
                pathname:`/recipe/${recipe.title}`,
                query: { 
                  ...recipe,
                  ... recipe.users,
                  recipeId: recipe.id,
                  ingredients: JSON.stringify(recipe.ingredients), 
                  directions: JSON.stringify(recipe.directions)
                  }
                }}
                as={`/recipe/${(recipe.title)}`}
               >
                <Image
                  src={`${recipe.thumbnail ? recipe.thumbnail : '/images/no-image-sm.jpg'}`}
                  alt=''
                  width={100}
                  height={100}
                  className='rounded-xl w-full h-full absolute top-0 object-cover'
                />
                <p className='-mt-9 px-3 py-2 rounded-b-xl text-white truncate ... bg-[#23151599] z-10 relative w-full text-sm'>{recipe.title}</p>
              </Link>
            </div>
        ))}
      </div>
  )
}

export default RecipeList

