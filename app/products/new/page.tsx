import React from 'react'
import ProductPage from '@/components/ProductPage'
import BackButton from '@/components/Atoms/Buttons/BackButton'
import { ShopsBase } from '@/lib/db/shops'
import { OptionAdapter } from '@/lib/adapters/OptionAdapter'
import { Categories, Shop } from '@/lib/seeds/types'
import { CategoriesBase } from '@/lib/db/categories'

export default async function NewProduct() {
  const shopBase = new ShopsBase()
  const categoriesBase = new CategoriesBase()

  const { data: shopsRows } = await shopBase.getAllShops()
  const { data: categoriesRows } = await categoriesBase.getAllCategories()

  const shopsAdapter = new OptionAdapter<Shop>(shopsRows as Shop[], [
    'name',
    'id',
    'image',
  ])

  const categoriesAdapter = new OptionAdapter<Categories>(
    categoriesRows as Categories[],
    ['name', 'id', 'image']
  )

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
