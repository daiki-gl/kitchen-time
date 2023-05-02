import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BsBookmarkPlus } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'

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


const RecipePage = ({data}:RecipePageProps) => {
  const ingredients = JSON.parse(data.ingredients)
  const directions = JSON.parse(data.directions)

  const isAuth = true

  const { push } = useRouter()

  console.log({data});

  const handleDelete = async () => {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', data.recipeId)
      .select()
    
      if(error) console.log(error);

      push('/')
  }

  return (
    <div className="min-h-screen px-5 pt-14 pb-24 mx-auto md:ml-[68px] md:pt-5 lg:ml-80">
      <div className='w-full h-full max-h-80 mt-5 xl:max-h-[400px]'>
       { data.thumbnail &&(
        <Image 
          src={data.thumbnail} 
          width={300} 
          height={200} 
          loading='lazy'
          alt=''
          className='w-full max-h-80 mb-5 object-cover xl:max-h-[400px]'
        />
        )
       }

      </div>
      <div className='hidden mb-5 md:block'>
        <h2 className="text-3xl font-bold">{data.title}</h2>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <Link href={`/profile/${data.name}`} >
            <Image 
              src={`${data.avatar ? data.avatar : '/images/Guest.jpg'}`} 
              width={50} 
              height={50} 
              alt='user'
              className='rounded-full object-cover h-[50px] w-[50px] inline-block mr-3'
              />
              <span>{data.name}</span>
            </Link>
        </div>
        {isAuth ? 
        (
          <div>
            {/* <button className='mr-3 text-xl'><FiEdit /></button> */}
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
          <button className='text-xl'><BsBookmarkPlus/></button>
        )}
      </div>

  <div className="overflow-x-auto mt-10">
    <h2 className="text-xl font-bold mb-3">Ingredients: {data.serves}serve(s)</h2>
      <table className="table w-full">
        <tbody>
          {ingredients && ingredients.map((ingredient:any) => (
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
          <ol className="px-5 list-decimal">
            {directions && directions.map((direction:any) => <li key={direction.desc} className='[&:nth-child(odd)]:bg-primaryColor py-2 px-3'>{direction.desc}</li>)}
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

export async function getServerSideProps  (context:any) {
  return {
      props: { 
         data: context.query //pass it to the page props
      }
  }
}