import { ReactNode } from 'react'
import { Product } from '@/types/interface'

export type PropsWithChildren<P> = P & { children?: ReactNode }

interface PossiblePageParams {
  id?: string
}
interface PossibleSearchParams {}

export interface PageProps {
  params: PossiblePageParams
  searchParams: PossibleSearchParams
}

export interface IProductWithPrice extends Partial<Product> {
  price: number
  categoryId: string
  shopId: string
  productName: string
}

export interface IUpdateProductPage {
  productData: IProductWithPrice
  shopData: any
  categoriesData: any
}
