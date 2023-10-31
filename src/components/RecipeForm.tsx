import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';
import { config } from '@/config';
import { useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { type } from 'os';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z.object({
    title: z.string().min(1, {message: "Please enter the title more than one character"}).max(50, {message: "Please enter the title less than 50 characters"}),
    thumbnail: z.any()
              .transform((files) => { 
                if(files?.length === 0)  {
                 return files = null 
                } else {
                 z.any()
                  .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
                  .refine(
                    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                    "Only .jpg, .jpeg, .png and .webp formats are supported."
                  )
                }
                return files
              }),
    serves: z.number().min(0, {message: "Please enter the number more than 1"}).max(30, {message: "Please enter the number less than 30"}),
    tips: z.string().max(350)

})

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
      recipeId: string;
    }
  }


const RecipeForm = ({item}:RecipeFormProps) => {
    const { push, pathname } = useRouter()
    const [ingredients, setIngredients] = useState<any>([])
    const [directions, setDirections] = useState<any>([])
    const id = useSelector((state:any) => state.persistedReducer.users.user[0].id)
    const [ingredientInput, setIngredientInput] = useState(1)
    const [directionsInput, setDirectionsInput] = useState(1)

    const ingredientsRef = useRef(null);
    const directionsRef = useRef(null);

    console.log({item})


    useEffect(() => {
      item && item.ingredients && setIngredients(item.ingredients)
      item && item.directions && setDirections(item.directions)
    },[item])

    useEffect(() => {
     ingredients.length > 0 && setIngredientInput(ingredients.length)
     directions.length > 0 && setDirectionsInput(directions.length)
      console.log(ingredients);
    },[ingredients,directions])

   const { register, handleSubmit, formState: {errors, isSubmitting}, getValues } = useForm({
        resolver: zodResolver(schema),
        values: item ? {
            title: item.title,
            thumbnail: item.thumbnail,
            serves: item.serves,
            // ingredients: ingredients,
            // directions: directions,
            tips: item.tips
        } : {},
    })

    const insertImage = async (image:any) => {
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
     const ingredients = handleSanitize(ingredientsRef, 'name', 'quantity');
     const directions = handleSanitize(directionsRef, 'desc', 'image');
      const image = data.thumbnail && typeof data.thumbnail[0] !== 'string' ? await insertImage(data.thumbnail[0]) : data.thumbnail;

        if(pathname === '/recipe/create') {
          console.log(data.thumbnail);
          console.log(image);
         if(ingredients && directions) {
           const { data:_data,error }:any = await supabase.from('recipes')
              .insert({
                ...data, 
                thumbnail: image, 
                ingredients, 
                directions,
                user_id: id,
              })
              .select()
  
              if(error) console.log(error);
              console.log(_data);
         } 
        } else {
          const {data: _data,error}:any = await supabase.from('recipes')
              .update({
                ...data, 
                thumbnail: image,
                ingredients, 
                directions,
              })
              .eq('id',item!.recipeId)
              .select()
  
              if(error) console.log(error);

              console.log(_data);
        }
            push('/')
    }

    const handleSanitize = (ref:any,name1:any, name2:any) => {
      const length = ref.current.children.length;
      const newArr:string[] = []
      for(let i = 0; i < length; i++) {
        const obj:any = {};
        obj[name1] = ref.current.children[i].children[0].value;

        if(ref.current.children[i].children[1].type === 'file') {
          obj[name2] = ref.current.children[i].children[1].files;
        } else {
          obj[name2] = ref.current.children[i].children[1].value;
        }
        newArr.push(obj)
    }

    return newArr
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
          {errors.thumbnail && <p className='text-error'>{errors.thumbnail.message}</p>}
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
            min={1}
            max={30}
          />
          {errors.serves && <p className='text-error'>{errors.serves.message}</p>}
        </div>

        </div>

        <div id='ingredients' className='mb-5'>
        <h3 className="text-lg font-bold mb-1">Ingredients</h3>
        <div ref={ingredientsRef}>
          {(Array.from(Array(ingredientInput)).map((ingredient,i) => (
              <div className='mb-3 flex justify-between' key={ingredient}>
                  <input 
                      type="text" 
                      placeholder='Name: Onion'
                      className='bg-white rounded-md py-2 px-3 w-2/3 mr-1 outline-none'
                      // {...register(`ingredients.${i}.name`)}
                      defaultValue={ingredients[i] ? ingredients[i].name : ''}
                      />
                  <input 
                      type="text" 
                      placeholder='Quantity: 1pc'
                      className='bg-white rounded-md py-2 px-3 w-1/3 outline-none'
                      // {...register(`ingredients.${i}.quantity`)}
                      defaultValue={ingredients[i] ? ingredients[i].quantity : ''}
                      />
                  <button className='text-xl ml-2' type='button' onClick={() => setIngredientInput(prev => --prev)}><RiDeleteBin6Line /></button>
              </div> 
              ))) 
              }
              {/* {errors.ingredients && <p className='text-error'>{errors.ingredients.message}</p>} */}
        </div>
        <button 
          type='button' 
          className='text-center w-full border-2 border-primaryColor text-primaryColor py-2 rounded-md bg-white font-semibold hover:border-accentColor hover:bg-accentColor transition duration-300 hover:text-white'
          onClick={() => setIngredientInput(prev => ++prev)}
        >
            +Add an Ingredient
        </button>
      </div>

      <div className='mb-5'>
        <h3 className="text-lg font-bold mb-1">Directions</h3>

        <div ref={directionsRef}>
        {(
            Array.from(Array(directionsInput)).map((direction, i) => (
        <div className='relative mb-3 bg-white rounded-md py-3 px-2' key={direction}>
          <textarea 
            placeholder='Type the direction'
            className='bg-white outline-none w-11/12 pr-[50px] inline-block'
            // {...register(`directions.${i}.desc`)}
            defaultValue={directions[i] ? directions[i].desc : ''}
          ></textarea>
          <button className='inline-block align-middle w-1/12 text-xl' type='button' onClick={() => setDirectionsInput(prev => --prev)}>
                <RiDeleteBin6Line className='ml-auto' />
          </button>

            {/* <input
              type='file'
              id='direction-img'
              className='hidden'
            />
          <label htmlFor='direction-img' className='absolute top-1/2 -translate-y-1/2 right-1'>
            <Image 
              src={'/images/upload-image02.jpg'} 
              alt=''
              width={40}
              height={40}
              className='cursor-pointer'
            />
          </label> */}
        </div>
            )))
        }
      </div>

        <button 
          type='button' 
          className='text-center w-full border-2 border-primaryColor text-primaryColor py-2 rounded-md bg-white font-semibold hover:border-accentColor hover:bg-accentColor transition duration-300 hover:text-white'
          onClick={() => setDirectionsInput(prev => ++prev)}
          >
            +Add a Direction
        </button>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-1">Tips</h3>
        <textarea className='bg-white rounded-md w-full py-3 px-2' placeholder='Type some tips for cooking' 
        // ref={tipsRef}
        {...register('tips')}
        >
        </textarea>
        {errors.tips && <p className='text-error'>{errors.tips.message}</p>}
      </div>

    <button type='submit' className="btn w-full mt-5 bg-primaryColor text-white border-none hover:bg-accentColor">Edit Recipe</button>

    </form>
  </div>
  )
}

export default RecipeForm