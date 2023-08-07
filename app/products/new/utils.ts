import { ShopsBase } from '@/lib/db/shops'
import { CategoriesBase } from '@/lib/db/categories'
import { OptionAdapter } from '@/lib/adapters/OptionAdapter'
import { Category, Shop } from '@/types/interface'
import { ProductsBase } from '@/lib/db/products'
import { PricesBase } from '@/lib/db/prices'
import { IUpdateProductPage } from '@/app/types'
import { Option } from '@/components/Atoms/Inputs/inputTypes'

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

export const getInitialData = async () => {
  const shopsRows = await shopBase.getAllShops()
  const categoriesRows = await categoriesBase.getAllCategories()

  const shops = convertDataToOptions<Shop>(shopsRows as Shop[])
  const categories = convertDataToOptions<Category>(
    categoriesRows as Category[]
  )

  return { shops, categories }
}

const getProductDataById = async ({ id }: { id: string }) => {
  return await productsBase.getProduct(id)
}

const getProductRelatedAvailableShops = async ({
  productId,
}: {
  productId: string
}) => {
  return await shopBase.getRelatedToProductShops({ productId })
}

export const getProductDataWithPrice = async ({
  id,
}: {
  id: string
}): Promise<IUpdateProductPage | null> => {
  const product = await getProductDataById({ id })
  const availableShops = await getProductRelatedAvailableShops({
    productId: id,
  })

  const shopData = convertDataToOptions<Shop>(availableShops as Shop[])

  if (!product) return null

  const data = await pricesBase.getProductPrice({
    productId: id,
  })

  if (!data) return null

  const { category_id: categoryId, price, shop_id: shopId } = data[0]

  const productData = {
    id: product.id,
    image: product.image,
    productName: product.name,
    price,
    categoryId: categoryId.toString(),
    shopId: shopId.toString(),
  }

  return { productData, shopData, categoriesData: [] }
}
