import { ShopsBase } from '@/lib/db/shops'
import { CategoriesBase } from '@/lib/db/categories'
import { OptionAdapter } from '@/lib/adapters/OptionAdapter'
import { Categories, Shop } from '@/lib/seeds/types'

export const getInitialData = async () => {
  const shopBase = new ShopsBase()
  const categoriesBase = new CategoriesBase()

  const { data: shopsRows } = await shopBase.getAllShops()
  const { data: categoriesRows } = await categoriesBase.getAllCategories()

  const shopsAdapter = new OptionAdapter<Shop>(shopsRows as Shop[], [
    'name',
    'id',
    'image',
  ])

  const categoriesAdapter = new OptionAdapter<Categories>(
    categoriesRows as Categories[],
    ['name', 'id', 'image']
  )

  const shops = shopsAdapter.transformData()
  const categories = categoriesAdapter.transformData()

  return { shops, categories }
}
