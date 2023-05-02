import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';
import { config } from '@/config';
import { useSelector } from 'react-redux';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z.object({
    title: z.string().min(1, {message: "Please enter the title more than one character"}).max(50, {message: "Please enter the title less than 50 characters"}),
    // thumbnail: z.string(),
    thumbnail: z.any()
              .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
              .refine(
                (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported."
              ),
    serves: z.number().min(0, {message: "Please enter the number more than 1"}).max(30, {message: "Please enter the number less than 30"}),

    // JSON形式の場合を調べる (下記二つができないとアプデできない)
    // ingredients: z.string().array().min(1).max(100),
    // directions: z.string().array().min(1).max(100),
    tips: z.string().max(350)
});

export type RecipeFormProps = {
    item?: {
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


const RecipeForm = ({item}:RecipeFormProps) => {
    const { push, pathname } = useRouter()
    const [ingredients, setIngredients] = useState([])
    const [directions, setDirections] = useState([])
    const id = useSelector(state => state.users.user[0].id)

    useEffect(() => {
      if(item) {
        setIngredients(JSON.parse(item.ingredients))
        setDirections(JSON.parse(item.directions))
      }
    },[item])

   const { register, handleSubmit, formState: {errors, isSubmitting}, getValues } = useForm({
        resolver: zodResolver(schema),
        values: item ? {
            title: item.title,
            thumbnail: item.thumbnail,
            serves: item.serves,
            ingredients: ingredients,
            directions: directions,
            tips: item.tips
        } : {},
    })

    const insertImage = async (image:string) => {
      const newName = Date.now() + image.name;
      const { data, error } = await supabase.storage.from('thumbnail').upload(newName, image)
        if(error) console.log(error);
         if(data) {
          const url = config.supabase_url + `/storage/v1/object/public/thumbnail/` + data.path;
          return url
         }

         return 
    }

    const onSubmit = async(data:any) => {
      console.log(data);
      // Not update properly
        const image = await insertImage(data.thumbnail[0]);
        if(pathname === '/recipe/create') {
          const { error }:any = await supabase.from('recipes')
            .insert({...data, thumbnail: image, user_id: id})
            .select()

            if(error) console.log(error);

        } else {
          const {error}:any = await supabase.from('recipes')
              .update({...data})
              .eq('id',item.id)
              .select()
  
              if(error) console.log(error);
        }
            push('/')
    }

  return (
    <div className='w-full h-full max-h-80 mt-5'>
    <form onSubmit={handleSubmit(onSubmit)} className='pb-24 md:pb-5'>

      <div className='mb-5 form-control'>
          <label className='label cursor-pointer' htmlFor="image">
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
            // className='hidden' 
            {...register('thumbnail')}
          />
      </div>

      <div className='mb-5'>
        <input 
          type="text" 
          placeholder='Title'
          className='text-lg bg-transparent border-b w-full border-accentColor font-bold outline-none'
          {...register('title')}
        />
        {errors.title && <p className='text-error'>{errors.title.message}</p>}
      </div>

      <div className='mb-5'>

          <h3 className="text-lg font-bold mb-1">Serves</h3>
        <div className='mb-3'>
          <input 
            type="number" 
            placeholder='Serves:'
            className='bg-white w-full rounded-md py-2 px-3 outline-none'
            {...register('serves', { valueAsNumber: true })}
          />
          {errors.serves && <p className='text-error'>{errors.serves.message}</p>}
        </div>

        <h3 className="text-lg font-bold mb-1">Ingredients</h3>
        {item && ingredients ? (ingredients.map((ingredient,i) => (
        // {item ? (ingredients.map((ingredient,i) => (
            <div className='mb-3 flex justify-between' key={ingredient.name}>
                <input 
                    type="text" 
                    placeholder='Name: Onion'
                    className='bg-white rounded-md py-2 px-3 w-2/3 mr-1 outline-none'
                    {...register(`ingredients.${i}.name`)}
                    />
                <input 
                    type="text" 
                    placeholder='Quantity: 1pc'
                    className='bg-white rounded-md py-2 px-3 w-1/3 outline-none'
                    {...register(`ingredients.${i}.quantity`)}
                    />
            </div> 
            ))) :
            (
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
            )
            }
        <button 
          type='button' 
          className='text-center w-full border-2 border-primaryColor text-primaryColor py-2 rounded-md bg-white font-semibold hover:border-accentColor hover:bg-accentColor transition duration-300 hover:text-white'>
            +Add an Ingredient
        </button>
      </div>

      <div className='mb-5'>
        <h3 className="text-lg font-bold mb-1">Directions</h3>

        {item && directions ? (
            directions.map((direction, i) => (
        // {item ? (
        //     directions.map((direction, i) => (
        <div className='relative mb-3 bg-white rounded-md py-3 pl-2 pr-14' key={direction.desc}>
          <textarea 
            placeholder='Type the direction'
            className='bg-white outline-none w-full pr-[50px]'
            {...register(`directions.${i}.desc`)}
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
            {...register(`directions.${i}.image`)}
          />
        </div>
            ))): 
            (
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
            )
        }

        <button 
          type='button' 
          className='text-center w-full border-2 border-primaryColor text-primaryColor py-2 rounded-md bg-white font-semibold hover:border-accentColor hover:bg-accentColor transition duration-300 hover:text-white'>
            +Add a Direction
        </button>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-1">Tips</h3>
        <textarea className='bg-white rounded-md w-full py-3 px-2' placeholder='Type some tips for cooking' {...register('tips')}>
        </textarea>
        {errors.tips && <p className='text-error'>{errors.tips.message}</p>}
      </div>

    <button type='submit' className="btn w-full mt-5 bg-primaryColor text-white border-none hover:bg-accentColor">Edit Recipe</button>

    </form>
  </div>
  )
}

export default RecipeForm