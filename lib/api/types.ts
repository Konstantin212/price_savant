import { QueryResult } from '@vercel/postgres'

export type RequestType = 'get' | 'post' | 'put' | 'delete' | 'patch'

export interface IDBRequestResult {
  result?: QueryResult
  error?: string
}
