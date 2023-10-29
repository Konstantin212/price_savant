import React from 'react'
import ProductPageRoute from '@/components/pages/ProductPageRoute/ProductPageRoute'
import { getInitialData } from '@/app/products/new/utils'

export default async function NewProduct() {
  const { shops, categories } = await getInitialData({})
  return <ProductPageRoute shops={shops} categories={categories} />
}
