import { NextResponse } from 'next/server'
import { db } from '@vercel/postgres'
import isEmpty from 'lodash.isempty'
import { ResponseHandler } from '@/lib/api/responseHandler'

export async function GET() {
  const client = await db.connect()
  let query

  try {
    query = await client.sql`SELECT * FROM shops`
  } catch (error) {
    return NextResponse.json({ error })
  }

  return NextResponse.json({ status: 200, data: query.rows })
}

export async function POST(req: Request) {
  const client = await db.connect()
  const { image, shopName } = await req.json()
  const responseHandler = new ResponseHandler()

  let query

  try {
    const isShopAlreadyExists =
      await client.sql`SELECT id FROM shops WHERE name = ${shopName}`

    if (!isEmpty(isShopAlreadyExists.rows)) {
      return NextResponse.json(
        responseHandler.error({ message: 'This shop name is already exists.' })
      )
    }

    query =
      await client.sql`INSERT INTO Shops (name, image) VALUES (${shopName}, ${image})`
  } catch (error) {
    return NextResponse.json(
      responseHandler.error({
        messageTitle: shopName,
        tableName: 'Shop',
        data: error,
      })
    )
  }

  return NextResponse.json(
    responseHandler.succeed({ data: query, messageTitle: shopName })
  )
}
