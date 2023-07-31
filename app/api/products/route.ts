import { apiRouteHandler } from '@/lib/api/apiRouteHandler'
import { ProductsBase } from '@/lib/db/products'

export async function POST(req: Request) {
  const dbRequestFunction = async (): Promise<any> => {
    const productsBase = new ProductsBase()
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
