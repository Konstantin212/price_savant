import { ShopsBase } from '@/lib/db/shops'
import { CategoriesBase } from '@/lib/db/categories'
import { OptionAdapter } from '@/lib/adapters/OptionAdapter'
import { Category, CustomProductPrice, Shop } from '@/types/interface'
import { ProductsBase } from '@/lib/db/products'
import { PricesBase } from '@/lib/db/prices'
import { IUpdateProductPage } from '@/app/types'
import { Option } from '@/components/molecules/Inputs/inputTypes'
import { CurrencyAdapter } from '@/lib/adapters/CurrencyAdapter'

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

export const getInitialData = async ({
  shopId,
}: Partial<{ shopId: string }>) => {
  let shopRows
  const categoriesRows = await categoriesBase.getAllCategories()

  const categories = convertDataToOptions<Category>(
    categoriesRows as Category[]
  )

  if (shopId) {
    shopRows = await shopBase.getShopById(shopId)
  } else {
    shopRows = await shopBase.getAllShops()
  }

  const shops = convertDataToOptions<Shop>(shopRows as Shop[])

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

  const data = await pricesBase.getProductPrice({
    productId: id,
    shopId,
  })

  const priceData = data?.at(0)

  if (!product || !priceData) return null

  const { category_id: categoryId, price } = priceData as CustomProductPrice
  const currencyAdapter = new CurrencyAdapter(price)

  const productData = {
    id: product.id,
    image: product.image,
    productName: product.name,
    price: currencyAdapter.getReadablePrice(),
    categoryId: categoryId.toString(),
    shopId: shopId,
  }

  return { productData }
}
