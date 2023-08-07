export interface DataService {
  id: number
  name: string
  image: string
  createdAt?: Date
}

export interface Shop extends DataService {}

export interface Product extends DataService {}

export interface Category extends DataService {}

export interface Price {
  id: number
  price: number
  product_id: number
  shop_id: number
  category_id: number
}
