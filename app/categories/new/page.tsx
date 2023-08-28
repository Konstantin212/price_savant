import React from 'react'
import CategoriesPage from '@/components/CategoriesPage'
import BackButton from '@/components/molecules/Buttons/BackButton'

const NewCategory = () => {
  return (
    <div className='container mx-auto min-h-[calc(100%-87px)] py-10'>
      <BackButton />
      <h1 className='w-full text-center text-3xl font-bold'>
        Add new category
      </h1>
      <div className='flex min-h-[calc(100%-87px-120px)] flex-wrap items-center px-44'>
        <CategoriesPage />
      </div>
    </div>
  )
}

export default NewCategory
