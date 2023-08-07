import { ResponseHandler } from '@/lib/api/responseHandler'
import { NextResponse } from 'next/server'
import { IDBRequestResult, RequestType } from '@/lib/api/types'

interface IApiRouteHandler {
  requestType: RequestType
  dbRequestFunction(): Promise<IDBRequestResult>
}

export const apiRouteHandler = async ({
  dbRequestFunction,
  requestType,
}: IApiRouteHandler) => {
  const responseHandler = new ResponseHandler(requestType)
  let query
  let messageTitle

  try {
    const { result, error, target } = await dbRequestFunction()
    messageTitle = target
    if (error) {
      const { status, ...resp } = responseHandler.error({ message: error })
      return NextResponse.json(resp, { status })
    }
    query = result
  } catch (error) {
    const { status, ...resp } = responseHandler.error({
      data: error,
    })
    return NextResponse.json(resp, { status })
  }

  if (!query) {
    const { status, ...resp } = responseHandler.error({
      data: query,
      message: 'Query is empty',
    })
    return NextResponse.json(resp, { status })
  }

  return NextResponse.json(
    responseHandler.succeed({ data: query, messageTitle })
  )
}
