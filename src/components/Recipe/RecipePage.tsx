import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsBookmarkPlus, BsFillBookmarkDashFill, BsFillBookmarkPlusFill } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'

const RecipePage = ({data}:{data:any}) => {
    // const ingredients = JSON.parse(data.ingredients)
//   const directions = JSON.parse(data.directions)
  const { id } = useSelector((state:any) => state.persistedReducer.users.user[0])
  const { push } = useRouter()
  const [bookmark, setBookmark] = useState(false)

  const handleDelete = async () => {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', data.id)
      .select()
    
      if(error) console.log(error);

      push('/')
  }


  const toggleBookmark = async() => {
    if(bookmark) {
     const {data: res, error } = await supabase.from('bookmark')
        .delete()
        .eq('recipe_id',data.id).eq('user_id', id)
        .select()
        
        if(error) console.log(error);

        if(res) {
          setBookmark(false)
          fetchBookmark()
        }
        return
    }

    if(!bookmark) {
      const { data: res, error } = await supabase.from('bookmark')
        .insert({
          recipe_id: data.id,
          user_id: id
        })
        .select()
    
        if(error) console.log(error);

        if(res) {
          setBookmark(true)
          fetchBookmark()
        }
        return
    }
  }

    const fetchBookmark = async() => {
      const {data: res, error} = await supabase.from('bookmark') 
          .select()
          .eq('user_id', id)
          .eq('recipe_id', data.recipeId)

          if(error) console.log(error);
          // console.log(res);
          if(res && res?.length > 0) {
            setBookmark(true)
          } else {
            false
          }
    }

    return (
        <div className="min-h-screen px-5 pt-14 pb-24 mx-auto md:ml-[68px] md:pt-5 lg:ml-80">
          <div className='w-full h-full max-h-80 mt-5 xl:max-h-[400px]'>
            <Image
              src={`${data.thumbnail ? data.thumbnail : '/images/no-image.jpg'}`} 
              width={300} 
              height={200} 
              loading='lazy'
              alt=''
              className='w-full max-h-80 mb-5 object-cover xl:max-h-[400px]'
            />
    
          </div>
          <div className='hidden mb-5 md:block'>
            <h2 className="text-3xl font-bold">{data.title}</h2>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <Link 
                href={{
                  pathname:`/profile/${data.users.id}`,
                //   query: { 
                //     ...data,
                //     }
                  }}
                  as={`/profile/${(data.users.id)}`}  
              >
                <Image 
                  src={`${data.users.avatar ? data.users.avatar : '/images/Guest.jpg'}`} 
                  width={50} 
                  height={50} 
                  alt='user'
                  className='rounded-full object-cover h-[50px] w-[50px] inline-block mr-3'
                  />
                  <span>{data.users.name}</span>
                </Link>
            </div>
            {id === data.user_id ? 
            (
              <div>
                <Link 
                  href={{
                    pathname: `/recipe/${data.title}/edit`,
                    query: {...data}
                  }} 
                  as={`/recipe/${data.title}/edit`}
                  className='mr-3 text-xl inline-block'><FiEdit /></Link>
                <button className='text-xl' onClick={() => handleDelete()}><RiDeleteBin6Line /></button>
              </div>
            ) : (
              <button onClick={toggleBookmark} className='text-xl'>
                          {bookmark ? (
                            <BsFillBookmarkDashFill className='text-accentColor' />
                            ):(
                              <BsFillBookmarkPlusFill className='text-primaryColor' />
                          )}
                        </button>
            )}
          </div>
    
      <div className="overflow-x-auto mt-10">
        <h2 className="text-xl font-bold mb-3">Ingredients: {data.serves}serve(s)</h2>
          <table className="table w-full">
            <tbody>
              {data.ingredients && data.ingredients.map((ingredient:any) => (
                <tr key={ingredient.name} className="[&:nth-child(odd)]:bg-primaryColor">
                  <td className='py-2'>{ingredient.name}</td>
                  <td className='py-2 text-right'>{ingredient.quantity}</td>
                </tr>
                )
              )}
            </tbody>
          </table>
      </div>
    
        <div className="overflow-x-auto mt-12">
          <h2 className="text-xl font-bold mb-3">Directions</h2>
              <ol className="pl-5 list-decimal">
                {data.directions && data.directions.map((direction:any) => (
                <li key={direction.desc} className='[&:nth-child(odd)]:bg-primaryColor py-2 px-3'>
                  <span>{direction.desc}</span>
                  {/* <div className="flex justify-between gap-2 md:flex-row">
                  <Image className='w-28 h-28 object-cover md:w-32 md:h-32' src={'/images/no-image-white.jpg'} width={120} height={120} alt='' />
                  </div> */}
                </li>
                ))}
              </ol>
        </div>
    
        <div className="mt-12">
          <h2 className="text-xl font-bold">Tips</h2>
          <p>{data.tips}</p>
        </div>
    
      </div>
        
      )
}

export default RecipePage