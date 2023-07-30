import { apiRouteHandler } from '@/lib/api/apiRouteHandler'
import { IDBRequestResult } from '@/lib/api/types'
import { ShopsBase } from '@/lib/db/shops'

export async function POST(req: Request) {
  const dbRequestFunction = async (): Promise<IDBRequestResult> => {
    const shopsBase = new ShopsBase()
    const { image, shopName } = await req.json()

    const { result, error } = await shopsBase.createShop({
      image,
      name: shopName,
    })

    if (error) {
      return { error }
    }

    return { result, target: shopName }
  }

  return await apiRouteHandler({
    dbRequestFunction,
    requestType: 'post',
  })
}
