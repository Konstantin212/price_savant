import React from 'react'
import { PageProps } from '@/app/types'
import {
  getInitialData,
  getProductDataWithPrice,
} from '@/app/products/new/utils'
import ProductPageRoute from '@/pages/ProductPageRoute'

export default async function ProductPage({ params: { id } }: PageProps) {
  if (!id) return 'Id is false'

  const { categories } = await getInitialData()
  const data = await getProductDataWithPrice({ id })

  if (!data) return 'Error'

  const { productData, shopData } = data

  return (
    <ProductPageRoute
      shops={shopData}
      categories={categories}
      data={productData}
    />
  )
}
