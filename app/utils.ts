import { ShopsBase } from '@/lib/db/shops'
import { CategoriesBase } from '@/lib/db/categories'
import { ProductsBase } from '@/lib/db/products'

export const getInitialData = async () => {
  const shopBase = new ShopsBase()
  const categoriesBase = new CategoriesBase()
  const productsBase = new ProductsBase()

  try {
    const [shopData, categoriesData, productsData] = await Promise.all([
      shopBase.getShopLength(),
      categoriesBase.getCategoriesLength(),
      productsBase.getProductsLength(),
    ])

    return { shopData, categoriesData, productsData }
  } catch (e) {
    throw Error(e as string)
  }
}
