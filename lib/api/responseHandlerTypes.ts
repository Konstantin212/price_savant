import { RequestType } from '@/lib/api/types'
import { QueryResult, QueryResultRow } from '@vercel/postgres'

export interface IMethodResult<Q> {
  status: number
  msg?: string
  error?: string
  data: Q
}

export interface ISuccessParams<T> {
  message?: string
  messageTitle?: string
  data: T
}

export interface IErrorParams {
  message?: string
  messageTitle?: string
  tableName?: string
  data?: unknown
}

export interface IResponseHandler {
  readonly defaultSuccessMessage: string
  readonly defaultErrorMessage: string
  readonly requestType: RequestType

  message?: string
  messageTitle?: string
  tableName?: string

  succeed(
    params: ISuccessParams<QueryResult<QueryResultRow>>
  ): IMethodResult<QueryResult<QueryResultRow>>
  error(params: IErrorParams): IMethodResult<unknown>
}
