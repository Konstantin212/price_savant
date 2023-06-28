import { VercelPoolClient } from '@vercel/postgres'
import isEmpty from 'lodash.isempty'
import { apiRouteHandler } from '@/lib/api/apiRouteHandler'
import { IDBRequestResult } from '@/lib/api/types'

export async function GET() {
  const dbRequestFunction = async (
    client: VercelPoolClient
  ): Promise<IDBRequestResult> => ({
    result: await client.sql`SELECT * FROM shops`,
  })

  return await apiRouteHandler({
    dbRequestFunction,
    requestType: 'get',
  })
}

export async function POST(req: Request) {
  let target

  const dbRequestFunction = async (
    client: VercelPoolClient
  ): Promise<IDBRequestResult> => {
    const { image, shopName } = await req.json()
    const isShopAlreadyExists =
      await client.sql`SELECT id FROM shops WHERE name = ${shopName}`

    if (!isEmpty(isShopAlreadyExists.rows)) {
      return { error: 'This shop name is already exists' }
    }

    target = shopName

    const result =
      await client.sql`INSERT INTO Shops (name, image) VALUES (${shopName}, ${image})`

    return { result }
  }

  return await apiRouteHandler({
    dbRequestFunction,
    requestType: 'post',
    target,
  })
}
