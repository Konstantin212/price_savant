import { ProductData, products, ProductsPromise } from '@/mock/products'

const shops: any = new Promise((resolve) => resolve([]))
const categories: any = new Promise((resolve) => resolve([]))

export interface ShopPromise extends Promise<ProductData[]> {}

export interface CategoryPromise extends Promise<ProductData[]> {}

interface Data {
  [key: number]: ProductsPromise | ShopPromise | CategoryPromise
}

export const data: Data = [products, shops, categories]
