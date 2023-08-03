import { ShopsBase } from '@/lib/db/shops'
import { CategoriesBase } from '@/lib/db/categories'
import { OptionAdapter } from '@/lib/adapters/OptionAdapter'
import { Category, Shop } from '@/types/interface'

export const getInitialData = async () => {
  const shopBase = new ShopsBase()
  const categoriesBase = new CategoriesBase()

  const shopsRows = await shopBase.getAllShops()
  const categoriesRows = await categoriesBase.getAllCategories()

  const shopsAdapter = new OptionAdapter<Shop>(shopsRows as Shop[], [
    'name',
    'id',
    'image',
  ])

  const categoriesAdapter = new OptionAdapter<Category>(
    categoriesRows as Category[],
    ['name', 'id', 'image']
  )

  const shops = shopsAdapter.transformData()
  const categories = categoriesAdapter.transformData()

  return { shops, categories }
}
