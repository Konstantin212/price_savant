import { ShopsBase } from '@/lib/db/shops'
import { CategoriesBase } from '@/lib/db/categories'
import { OptionAdapter } from '@/lib/adapters/OptionAdapter'
import { Category, Shop } from '@/types/interface'
import { ProductsBase } from '@/lib/db/products'
import { PricesBase } from '@/lib/db/prices'
import { IUpdateProductPage } from '@/app/types'
import { Option } from '@/components/molecules/Inputs/inputTypes'

const productsBase = new ProductsBase()
const shopBase = new ShopsBase()
const categoriesBase = new CategoriesBase()
const pricesBase = new PricesBase()

const convertDataToOptions = <D extends Record<string, any>>(
  data: D[]
): Option[] => {
  const adapter = new OptionAdapter<D>(data as D[], ['name', 'id', 'image'])

  return adapter.transformData()
}

export const getInitialData = async ({ shopId }: { shopId: string }) => {
  const shopRows = await shopBase.getShopById(shopId)
  const categoriesRows = await categoriesBase.getAllCategories()

  const shops = convertDataToOptions<Shop>(shopRows as Shop[])
  const categories = convertDataToOptions<Category>(
    categoriesRows as Category[]
  )

  return { categories, shops }
}

export const getProductDataWithPrice = async ({
  id,
  shopId,
}: {
  id: string
  shopId: string
}): Promise<IUpdateProductPage | null> => {
  const product = await productsBase.getProduct(id)

  if (!product) return null

  const data = await pricesBase.getProductPrice({
    productId: id,
    shopId,
  })

  if (!data) return null

  const { category_id: categoryId, price } = data[0]

  const productData = {
    id: product.id,
    image: product.image,
    productName: product.name,
    price,
    categoryId: categoryId.toString(),
    shopId: shopId,
  }

  return { productData, categoriesData: [] }
}
