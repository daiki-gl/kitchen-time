import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const SearchInput = () => {
  return (
    <form className='hidden w-full md:block relative mb-5'>
          <input 
            type="text" 
            placeholder='Search recipe' 
            className='w-full bg-white rounded-full py-2 px-4 h-10 outline-none'
            />
          <button className="btn absolute top-0 right-0 h-10 min-h-[2.5rem] outline-none rounded-s-none rounded-e-full bg-accentColor text-lg border-none">
            <AiOutlineSearch className='text-white' />
        </button>
    </form>
  )
}

export default SearchInput