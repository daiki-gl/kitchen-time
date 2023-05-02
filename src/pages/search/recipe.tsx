import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const SearchRecipe = () => {
  const [results, setResults] = useState(null);

  const handleSearch = async(e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const keyword = e.target.value || null
    console.log(keyword);
    const { data, error } = await supabase.from('recipes')
      .select()
      .ilike('title', `%${keyword}%`)

      if(error) console.log(error);
      setResults(data)
  }

  return (
    <div className='min-h-screen px-5 pt-14 pb-24 mx-auto md:ml-[68px] md:pt-5 lg:ml-80'>
      <form className='relative my-5 w-full'>
        <input 
          type="text"
          placeholder='Search Recipe'
          className='w-full py-2 px-4 bg-white rounded-full text-font-color'
          onChange={(e) => handleSearch(e)}
        />
      </form>

      <div className="text-sm5">
        <h3 className="text-xl font-bold">Result</h3>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">


            {results && (
              results.map((result) => (
            <div key={result.id} className="rounded-full w-full relative pt-[80%]">
              <Link href={`/recipe/${result.title}`} >
                <Image 
                  src={`${result.thumbnail}`}
                  alt=''
                  width={155}
                  height={130}
                  className='rounded-xl w-full h-full absolute top-0 object-cover'
                />
                <p className='-mt-9 px-3 py-2 rounded-b-xl text-white truncate ... bg-[#23151599] z-10 relative w-full text-sm'>{result.title}</p>
              </Link>
            </div>
              ))
            )}
          </div>
      </div>
    </div>
  )
}

export default SearchRecipe