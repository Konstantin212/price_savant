import { apiRouteHandler } from '@/lib/api/apiRouteHandler'
import { ProductsBase } from '@/lib/db/products'
import { TBooleanString } from '@/lib/db/types'

const productsBase = new ProductsBase()
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const withShops = searchParams.get('withShops') as TBooleanString
  const dbRequestFunction = async (): Promise<any> => {
    try {
      const { result } = await productsBase.getAllProducts(withShops)

      return { result }
    } catch (e) {
      console.error(e)
      throw new Error(e as string)
    }
  }

  return await apiRouteHandler({
    dbRequestFunction,
    requestType: 'get',
  })
}

export async function POST(req: Request) {
  const dbRequestFunction = async (): Promise<any> => {
    const { image, shopId, categoryId, productName, price } = await req.json()

    const { result, error } = await productsBase.createProduct({
      image,
      name: productName,
      shopId,
      categoryId,
      price,
    })

    if (error) {
      return { error }
    }

    return { result, target: productName }
  }

  return await apiRouteHandler({
    dbRequestFunction,
    requestType: 'post',
  })
}
