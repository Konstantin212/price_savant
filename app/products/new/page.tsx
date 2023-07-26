import React from 'react'
import ProductPage from '@/components/ProductPage'
import BackButton from '@/components/Atoms/Buttons/BackButton'
import { _get } from '@/lib/api/utils'
import { OptionAdapter } from '@/lib/adapters/OptionAdapter'
import { Categories, Shop } from '@/lib/seeds/types'

const NewProduct = async () => {
  const shopsRequest = await _get('/api/shops')
  const categoriesRequest = await _get('/api/categories')

  const {
    data: { rows: shopsRows },
  } = await shopsRequest.json()

  const {
    data: { rows: categoriesRows },
  } = await categoriesRequest.json()

  const shopsAdapter = new OptionAdapter<Shop>(shopsRows, [
    'name',
    'id',
    'image',
  ])

  const categoriesAdapter = new OptionAdapter<Categories>(categoriesRows, [
    'name',
    'id',
    'image',
  ])

  const shops = shopsAdapter.transformData()
  const categories = categoriesAdapter.transformData()

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

export default NewProduct
