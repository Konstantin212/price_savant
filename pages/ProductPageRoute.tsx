import React from 'react'
import ProductPage from '@/components/ProductPage'
import { Option } from '@/components/molecules/Inputs/inputTypes'
import { IProductWithPrice } from '@/app/types'
import BackButton from '@/components/molecules/Buttons/BackButton'

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
        <ProductPage
          shops={shops}
          categories={categories}
          data={data}
          isEdit={isEdit}
        />
      </div>
    </div>
  )
}

export default ProductEditPage
