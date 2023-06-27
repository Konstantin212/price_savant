import { QueryResult, QueryResultRow } from '@vercel/postgres'

interface ISuccessParams<T> {
  message?: string
  messageTitle?: string
  data: T
}

interface IErrorParams {
  message?: string
  messageTitle?: string
  tableName?: string
  data?: unknown
}

export class ResponseHandler {
  readonly defaultSuccessMessage: string
  readonly defaultErrorMessage: string

  constructor() {
    this.defaultSuccessMessage = 'Response has been sent'
    this.defaultErrorMessage = "Response hasn't been sent"
  }

  succeed({
    message,
    messageTitle,
    data,
  }: ISuccessParams<QueryResult<QueryResultRow>>) {
    const successMessage = messageTitle && `${messageTitle} successfully added.`
    const msg = message || successMessage || this.defaultSuccessMessage

    return { status: 200, msg, data }
  }
  error({ message, messageTitle, tableName, data }: IErrorParams) {
    const errorMessage =
      messageTitle &&
      `The value ${messageTitle} hasn't been added to table ${tableName}.`
    const error = message || errorMessage || this.defaultErrorMessage

    return { status: 500, error, data }
  }
}
