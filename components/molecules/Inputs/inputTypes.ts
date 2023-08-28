import { FormFields as CategoryFields } from '@/components/CategoriesPage'
import { FormFields as ShopFields } from '@/components/ShopPage'

export interface Option {
  readonly label: string
  readonly value: string
  readonly icon?: string
}

export type AllowedInputNames = CategoryFields | ShopFields
