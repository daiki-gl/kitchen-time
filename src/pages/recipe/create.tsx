import RecipeForm from '@/components/RecipeForm'
import SearchBox from '@/components/SearchBox'
import SearchInput from '@/components/SearchInput'
import Image from 'next/image'
import React from 'react'

const Create = () => {
  return (
    <div className="min-h-screen overflow-y-auto px-5 pt-14 pb-24 mx-auto md:ml-[68px] md:pt-5 lg:ml-80">

      <div className="container mb-5 max-w-full md:px-4 md:mx-auto">
        <SearchInput />
      </div>

      <RecipeForm />

  </div>
  )
}

export default Create