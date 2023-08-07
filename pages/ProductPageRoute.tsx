import React from 'react'
import BackButton from '@/components/Atoms/Buttons/BackButton'
import ProductPage from '@/components/ProductPage'
import { Option } from '@/components/Atoms/Inputs/inputTypes'
import { IProductWithPrice } from '@/app/types'

interface IProductEditPage {
  shops: Option[]
  categories: Option[]
  data?: IProductWithPrice | null
}

const ProductEditPage = ({ shops, categories, data }: IProductEditPage) => {
  const isEdit = Boolean(data)
  return (
    <div className='container mx-auto min-h-[calc(100%-87px)] py-10'>
      <BackButton />
      <h1 className='w-full text-center text-3xl font-bold'>
        {isEdit ? 'Edit' : 'Add new'} product
      </h1>
      <div className='flex min-h-[calc(100%-87px-120px)] flex-wrap items-center px-44'>
        <ProductPage shops={shops} categories={categories} data={data} />
      </div>
    </div>
  )
}

export default ProductEditPage
