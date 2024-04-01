import { supabase } from '@/lib/supabaseClient'
import { User } from '@/types/type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const SearchUser = () => {
  const [results, setResults] = useState<User[] | null>(null);
  
  async function searchUser(keyword:string | null) {
   const {data, error} = await supabase.from('users')
      .select()
      .ilike('name', `%${keyword}%`)
      if(error) console.log(error);
      const userData = data as User[]
      setResults(userData)
  } 
  
  const handleSearch = async(e:React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value || null
      searchUser(keyword)
  }

  return (
    <div className='min-h-screen px-5 pt-14 pb-24 mx-auto md:ml-[68px] md:pt-5 lg:ml-80'>
      <form className='relative mt-5 w-full'>
        <input 
          type="text"
          placeholder='Search User'
          className='w-full py-2 px-4 bg-white rounded-full text-font-color'
          onChange={(e) => handleSearch(e)}
        />
      </form>

      <div className="my-3">
        {results && (
          results.map((result:User) => (
          <div key={result.id} className="my-5">
            <Link href={{
                pathname:`/profile/${result.id}`,
                query: { 
                  ...result,
                  }
                }}
                as={`/profile/${(result.id)}`}
                >
              <Image 
                src={`${result.avatar ? result.avatar : '/images/Guest.jpg'}`}
                alt=''
                width={40}
                height={40}
                className='inline-block object-cover rounded-full w-[40px] h-[40px] mr-3'
              />
              <span>{result.name}</span>
            </Link>
          </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SearchUser