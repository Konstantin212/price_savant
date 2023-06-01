import React from 'react'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'

const Search = () => {
  return (
    <div className='relative mx-16 w-full'>
      <input
        type='text'
        placeholder='Search...'
        className='block w-full rounded-lg px-3 py-2 text-primary outline-0 transition-shadow duration-500 focus:shadow-md focus:shadow-secondary'
      />
      <MagnifyingGlassCircleIcon className='absolute right-3 top-[calc(50%-14px)] h-7 w-7 text-secondary' />
    </div>
  )
}

export default Search
