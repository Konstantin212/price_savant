import React from 'react'
import ProductPage from '@/components/ProductPage'
import BackButton from '@/components/Atoms/Buttons/BackButton'
import { _get } from '@/lib/api/utils'
import { OptionAdapter } from '@/lib/adapters/OptionAdapter'
import { Categories, Shop } from '@/lib/seeds/types'

async function getShops() {
  const res = await _get('/api/shops')
  return res.json()
}
async function getCategories() {
  const res = await _get('/api/categories')
  return res.json()
}

export default async function NewProduct() {
  // const shopsRes = getShops()
  // const categoriesRes = getCategories()
  const shopsRes = new Promise((res) => res)
  const categoriesRes = new Promise((res) => res)
  // const [shopsData, categoriesData] = await Promise.all([
  //   shopsRes,
  //   categoriesRes,
  // ])
  // const {
  //   data: { rows: shopsRows },
  // } = shopsData
  // const {
  //   data: { rows: categoriesRows },
  // } = categoriesData
  //
  // const shopsAdapter = new OptionAdapter<Shop>(shopsRows, [
  //   'name',
  //   'id',
  //   'image',
  // ])
  //
  // const categoriesAdapter = new OptionAdapter<Categories>(categoriesRows, [
  //   'name',
  //   'id',
  //   'image',
  // ])
  //
  // const shops = shopsAdapter.transformData()
  // const categories = categoriesAdapter.transformData()

  return (
    <div className='container mx-auto min-h-[calc(100%-87px)] py-10'>
      <BackButton />
      <h1 className='w-full text-center text-3xl font-bold'>Add new product</h1>
      <div className='flex min-h-[calc(100%-87px-120px)] flex-wrap items-center px-44'>
        <ProductPage shops={[]} categories={[]} />
      </div>
    </div>
  )
}
