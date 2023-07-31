import React from 'react'
import ProductPage from '@/components/ProductPage'
import BackButton from '@/components/Atoms/Buttons/BackButton'
import { getInitialData } from '@/app/products/new/utils'

export default async function NewProduct() {
  const { shops, categories } = await getInitialData()

  return (
    <div className='container mx-auto min-h-[calc(100%-87px)] py-10'>
      <BackButton />
      <h1 className='w-full text-center text-3xl font-bold'>Add new product</h1>
      <div className='flex min-h-[calc(100%-87px-120px)] flex-wrap items-center px-44'>
        <ProductPage shops={shops} categories={categories} />
      </div>
    </div>
  )
}
