import { VercelPoolClient } from '@vercel/postgres'
import { IDBRequestResult } from '@/lib/api/types'
import isEmpty from 'lodash.isempty'
import { apiRouteHandler } from '@/lib/api/apiRouteHandler'

export async function POST(req: Request) {
  const dbRequestFunction = async (
    client: VercelPoolClient
  ): Promise<IDBRequestResult> => {
    const { image, categoryName } = await req.json()
    const isItemAlreadyExists =
      await client.sql`SELECT id FROM categories WHERE name = ${categoryName}`

    if (!isEmpty(isItemAlreadyExists.rows)) {
      return { error: 'This category name is already exists' }
    }

    const result =
      await client.sql`INSERT INTO Categories (name, image) VALUES (${categoryName}, ${image})`

    return { result, target: categoryName }
  }

  return await apiRouteHandler({
    dbRequestFunction,
    requestType: 'post',
  })
}
