import React, { useState } from 'react'
import {
  PlusIcon,
  BuildingStorefrontIcon,
  TagIcon,
  BanknotesIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='fixed bottom-4 right-4 z-10'>
      <div className='relative'>
        <button
          className='rounded-full bg-secondary-dark p-4 text-white shadow-lg transition duration-500 hover:shadow-md hover:shadow-primary-light focus:outline-none'
          onClick={toggleMenu}
        >
          <PlusIcon className='h-6 w-6' />
        </button>

        {isOpen && (
          <div className='absolute -left-32 -top-[150px] z-10 mt-2 w-44 rounded-md bg-secondary-dark py-2 text-white shadow-lg'>
            <Link
              href='/products/new'
              className='flex w-full px-4 py-2 text-left hover:bg-secondary hover:text-primary'
            >
              <BanknotesIcon className='mr-2 h-6 w-6' />
              New Product
            </Link>
            <Link
              href='/shops/new'
              className='flex w-full px-4 py-2 text-left hover:bg-secondary hover:text-primary'
            >
              <BuildingStorefrontIcon className='mr-2 h-6 w-6' />
              New Shop
            </Link>
            <Link
              href='/categories/new'
              className='flex w-full px-4 py-2 text-left hover:bg-secondary hover:text-primary'
            >
              <TagIcon className='mr-2 h-6 w-6' />
              New Category
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default FloatingButton
