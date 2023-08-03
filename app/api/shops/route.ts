import { apiRouteHandler } from '@/lib/api/apiRouteHandler'
import { IDBRequestResult } from '@/lib/api/types'
import { ShopsBase } from '@/lib/db/shops'
import { handleError } from '@/lib/api/utils'

const shopsBase = new ShopsBase()
export async function GET() {
  const dbRequestFunction = async (): Promise<IDBRequestResult> => {
    try {
      const data = await shopsBase.getAllShops()

      return { result: data }
    } catch (e) {
      return handleError(e)
    }
  }

  return await apiRouteHandler({
    dbRequestFunction,
    requestType: 'post',
  })
}

export async function POST(req: Request) {
  const dbRequestFunction = async (): Promise<IDBRequestResult> => {
    const { image, shopName } = await req.json()

    const shopData = await shopsBase.createShop({
      image,
      name: shopName,
    })

    if (!shopData) return { error: 'Failed create shop request' }

    const { result, error } = shopData

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
