import SearchInput from '@/components/SearchInput';
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { RecipePageProps } from '.';
import RecipeForm from '@/components/RecipeForm';

const Edit = ({data:recipe}:RecipePageProps) => {
  const [item, setItem] = useState<RecipePageProps | null>(null)

  // const refTitle = useRef(recipe.title); 

  // JSON.parse(recipe.ingredients)

  useEffect(() => {
    setItem(recipe)
  },[recipe])

  // useEffect(() => {
  //   console.log(item);
  // },[item])


  return (
    <div className="min-h-screen overflow-y-auto px-5 pt-14 pb-24 mx-auto md:ml-[68px] md:pt-5 lg:ml-80">

      <div className="container mb-5 max-w-full md:px-4 md:mx-auto">
        <SearchInput />
      </div>

      {/* <div className='w-full h-full max-h-80 mt-5'>
        <form className='pb-24 md:pb-5'>

      {recipe && (
        <>
          <div className='mb-5'>
              <label className='cursor-pointer' htmlFor="image">
                <Image
                  src={'/images/upload-image.jpg'} 
                  width={300} 
                  height={200} 
                  loading='lazy'
                  alt=''
                  className='w-full max-h-80 object-cover'
                />
              </label>
              <input 
                type="file" 
                accept='image' 
                id='image' 
                className='' 
              />
          </div>

          <div className='mb-5'>
            <input 
              type="text" 
              placeholder='Title'
              className='text-lg bg-transparent border-b w-full border-accentColor font-bold outline-none'
              // ref={refTitle}
              // value={refTitle.current}
            />
          </div>

          <div className='mb-5'>
            <h3 className="text-lg font-bold mb-1">Ingredients</h3>

            <div className='mb-3'>
              <input 
                type="number" 
                placeholder='Serves:'
                className='bg-white w-full rounded-md py-2 px-3 outline-none'
              />
            </div>

            <div className='mb-3 flex justify-between'>
                  <input 
                    type="text" 
                    placeholder='Name: Onion'
                    className='bg-white rounded-md py-2 px-3 w-2/3 mr-1 outline-none'
                  />
                  <input 
                    type="text" 
                    placeholder='Quantity: 1pc'
                    className='bg-white rounded-md py-2 px-3 w-1/3 outline-none'
                    />
            </div>
            <div className='mb-3 flex justify-between'>
                  <input 
                    type="text" 
                    placeholder='Name: Sugar'
                    className='bg-white rounded-md py-2 px-3 w-2/3 mr-1 outline-none'
                  />
                  <input 
                    type="text" 
                    placeholder='Quantity: 2tbsp'
                    className='bg-white rounded-md py-2 px-3 w-1/3 outline-none'
                    />
            </div>
            <button 
              type='button' 
              className='text-center w-full border-2 border-primaryColor text-primaryColor py-2 rounded-md bg-white font-semibold hover:border-accentColor hover:bg-accentColor transition duration-300 hover:text-white'>
                +Add an Ingredient
            </button>
          </div>

          <div className='mb-5'>
            <h3 className="text-lg font-bold mb-1">Directions</h3>

            <div className='relative mb-3 bg-white rounded-md py-3 pl-2 pr-14'>
              <textarea 
                placeholder='Type the direction'
                className='bg-white outline-none w-full pr-[50px]'
              ></textarea>

              <label htmlFor='direction-img' className='absolute top-1/2 -translate-y-1/2 right-1'>
                <Image 
                  src={'/images/upload-image02.jpg'} 
                  alt=''
                  width={40}
                  height={40}
                  className='cursor-pointer'
                />
              </label>
              <input
                type='file'
                id='direction-img'
                className='hidden'
              />
            </div>
            
            <div className='relative mb-3 bg-white rounded-md py-3 pl-2 pr-14'>
              <textarea 
                placeholder='Type the direction'
                className='bg-white outline-none w-full pr-[50px]'
              ></textarea>

              <label htmlFor='direction-img' className='absolute top-1/2 -translate-y-1/2 right-1'>
                <Image 
                  src={'/images/upload-image02.jpg'} 
                  alt=''
                  width={40}
                  height={40}
                  className='cursor-pointer'
                />
              </label>
              <input
                type='file'
                id='direction-img'
                className='hidden'
              />
            </div>

            <button 
              type='button' 
              className='text-center w-full border-2 border-primaryColor text-primaryColor py-2 rounded-md bg-white font-semibold hover:border-accentColor hover:bg-accentColor transition duration-300 hover:text-white'>
                +Add a Direction
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-1">Tips</h3>
            <textarea className='bg-white rounded-md w-full py-3 px-2' placeholder='Type some tips for cooking'>
            </textarea>
          </div>

        <button className="btn w-full mt-5 bg-primaryColor text-white border-none hover:bg-accentColor">Create a Recipe</button>
        </>
      )}

        </form>
      </div> */}

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