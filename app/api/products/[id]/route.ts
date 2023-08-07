import { ProductsBase } from '@/lib/db/products'
import { apiRouteHandler } from '@/lib/api/apiRouteHandler'

const productsBase = new ProductsBase()
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const dbRequestFunction = async (): Promise<any> => {
    const { image, shopId, categoryId, productName, price } = await req.json()

    const { result, error } = await productsBase.updateProduct({
      id,
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
    requestType: 'put',
  })
}
