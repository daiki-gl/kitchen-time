import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsFillBookmarkDashFill, BsFillBookmarkPlusFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const RecipeCard = ({recipe}:{recipe:any}) => {

    const user = useSelector((state:any) => state.persistedReducer.users?.user[0])

    const [bookmark, setBookmark] = useState(false)

    const toggleBookmark = async() => {
      if(bookmark) {
       const {data, error } = await supabase.from('bookmark')
          .delete()
          .eq('recipe_id',recipe.id).eq('user_id', user.id)
          .select()
          
          if(error) console.log(error);

          if(data) {
            setBookmark(false)
            fetchBookmark()
          }
          return
      }

      if(!bookmark) {
        const { data, error } = await supabase.from('bookmark')
          .insert({
            recipe_id: recipe.id,
            user_id: user.id
          })
          .select()
      
          if(error) console.log(error);

          if(data) {
            setBookmark(true)
            fetchBookmark()
          }
          return
      }
    }

    console.log('RecipeCard.tsx ->',{recipe})
    
    useEffect(() => {
      console.log('RecipeCard.tsx(useEffect) ->',{recipe})
    },[])

      const fetchBookmark = async() => {
        const {data, error} = await supabase.from('bookmark') 
            .select()
            .eq('user_id', user?.id)
            .eq('recipe_id', recipe.id)

            if(error) console.log(error);
            // console.log(data);
            if(data && data?.length > 0) {
              setBookmark(true)
            } else {
              false
            }
      }

      useEffect(() => {
        fetchBookmark()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      
  return (
    <div className="recipe-box mb-6" key={recipe.id}>
              <Link href={{
                pathname:`/recipe/${recipe.id}`,
                query: { 
                  ...recipe,
                  ...recipe.users,
                  recipeId: recipe.id,
                  ingredients: JSON.stringify(recipe.ingredients), 
                  directions: JSON.stringify(recipe.directions),
                  }
                }}
                as={`/recipe/${recipe.id}`}
                >
                <div className="recipe-thumbnail h-[200px]">
                  <Image
                    className='object-cover w-full h-full' 
                    src={`${recipe.thumbnail ? recipe.thumbnail : '/images/no-image.jpg'}`} 
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
                    <button onClick={toggleBookmark} className='text-xl'>
                      {bookmark ? (
                        <BsFillBookmarkDashFill className='text-accentColor' />
                        ):(
                          <BsFillBookmarkPlusFill className='text-white' />
                      )}
                    </button>
                  </div>
                  <Link href={{
                        pathname:`/profile/${recipe.users.id}`,
                        // query: { 
                        //   ...recipe.users,
                        //   }
                        }}
                        // as={`/profile/${(recipe.users.id)}`}
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
  )
}

export default RecipeCard