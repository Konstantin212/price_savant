import React from 'react'
import { PageProps } from '@/app/types'
import {
  getInitialData,
  getProductDataWithPrice,
} from '@/app/products/new/utils'
import ProductPageRoute from '@/pages/ProductPageRoute'

export default async function ProductPage({
  params: { id },
  searchParams: { shopId },
}: PageProps) {
  if (!id || !shopId) return 'Id is false'

  // TODO replace with Promise
  const { categories, shops } = await getInitialData({ shopId })
  const data = await getProductDataWithPrice({ id, shopId })

  if (!data) return 'Error'

  const { productData } = data

  return (
    <ProductPageRoute
      shops={shops}
      categories={categories}
      data={productData}
    />
  )
}
