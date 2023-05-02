import Link from 'next/link'
import React from 'react'
import SearchInput from './SearchInput'

const SearchBox = () => {
  return (
    <section className="categories container mb-5 max-w-full md:px-4 md:mx-auto md:max-w-3xl lg:max-w-full">
        <SearchInput />
        <ul className="category-list flex items-center overflow-x-auto p-3">
          <li><Link href="/search/category/vegetable" className="bg-accentColor py-2 px-4 mr-3 rounded-3xl text-white">Vegetable</Link></li>
          <li><Link href="/search/category/meat" className="bg-accentColor py-2 px-4 mr-3 rounded-3xl text-white">Meat</Link></li>
          <li><Link href="/search/category/fish" className="bg-accentColor py-2 px-4 mr-3 rounded-3xl text-white">Fish</Link></li>
          <li><Link href="/search/category/soup" className="bg-accentColor py-2 px-4 mr-3 rounded-3xl text-white">Soup</Link></li>
          <li><Link href="/search/category/salad" className="bg-accentColor py-2 px-4 mr-3 rounded-3xl text-white">Salad</Link></li>
          <li><Link href="/search/category/don" className="bg-accentColor py-2 px-4 mr-3 rounded-3xl text-white">Don</Link></li>
          <li><Link href="/search/category/pasta" className="bg-accentColor py-2 px-4 mr-3 rounded-3xl text-white">Pasta</Link></li>
          <li><Link href="/search/category/noodle" className="bg-accentColor py-2 px-4 mr-3 rounded-3xl text-white">Noodle</Link></li>
        </ul>
      </section>
  )
}

export default SearchBox