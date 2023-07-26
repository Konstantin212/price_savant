import React from 'react'
import BackButton from '@/components/Atoms/Buttons/BackButton'
import CategoriesPage from '@/components/CategoriesPage'

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
