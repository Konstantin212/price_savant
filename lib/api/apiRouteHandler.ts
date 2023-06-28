import { db, VercelPoolClient } from '@vercel/postgres'
import { ResponseHandler } from '@/lib/api/responseHandler'
import { NextResponse } from 'next/server'
import { IDBRequestResult, RequestType } from '@/lib/api/types'

interface IApiRouteHandler {
  requestType: RequestType
  target?: string
  dbRequestFunction(client: VercelPoolClient): Promise<IDBRequestResult>
}

export const apiRouteHandler = async ({
  dbRequestFunction,
  requestType,
  target,
}: IApiRouteHandler) => {
  const client = await db.connect()
  const responseHandler = new ResponseHandler(requestType)
  let query

  try {
    const { result, error } = await dbRequestFunction(client)
    if (error) {
      return NextResponse.json(responseHandler.error({ message: error }))
    }
    query = result
  } catch (error) {
    return NextResponse.json(
      responseHandler.error({
        data: error,
      })
    )
  }

  if (!query)
    return NextResponse.json(
      responseHandler.error({
        data: query,
        message: 'Query is empty',
      })
    )

  return NextResponse.json(
    responseHandler.succeed({ data: query, messageTitle: target })
  )
}
