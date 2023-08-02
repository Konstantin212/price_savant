import { ShopInfo } from '@/mock/shopData'

export interface ProductData {
  id: number
  title: string
  category: string
  image: string
  shoplist: ShopInfo[]
}
