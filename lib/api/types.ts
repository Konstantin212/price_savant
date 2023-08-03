import { QueryResult, QueryResultRow } from '@vercel/postgres'

export type RequestType = 'get' | 'post' | 'put' | 'delete' | 'patch'

export interface IDBRequestResult {
  result?: QueryResultRow[] | QueryResult | null
  error?: string
  target?: string
}
