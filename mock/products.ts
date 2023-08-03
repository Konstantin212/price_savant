import { ShopInfo } from '@/mock/shopData'

export interface ProductData {
  id: number
  name: string
  category: string
  image: string
  shoplist?: ShopInfo[]
}
