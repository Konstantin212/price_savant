import { QueryResult, QueryResultRow } from '@vercel/postgres'
import { RequestType } from '@/lib/api/types'

interface IMethodResult<Q> {
  status: number
  msg?: string
  error?: string
  data: Q
}

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

interface IResponseHandler {
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

export class ResponseHandler implements IResponseHandler {
  readonly defaultSuccessMessage: string
  readonly defaultErrorMessage: string
  readonly requestType: RequestType
  message?: string
  messageTitle?: string
  tableName?: string

  constructor(requestType: RequestType) {
    this.requestType = requestType
    this.defaultSuccessMessage = 'Request has been completed successfully'
    this.defaultErrorMessage = "Request hasn't been completed"
  }

  private createResponseMessage(
    isError: boolean | undefined,
    errorMessage?: string,
    successMessage?: string
  ): string {
    const printError =
      isError && errorMessage ? errorMessage : this.defaultErrorMessage
    const printSuccess =
      !isError && successMessage ? successMessage : this.defaultSuccessMessage

    return this.message || printError || printSuccess
  }

  private createGetResponseMessage(isError: boolean | undefined): string {
    const errorMessage =
      this.messageTitle &&
      `The data from ${this.messageTitle} cannot be retrieved`
    const successMessage =
      this.messageTitle && `${this.messageTitle} successfully retrieved`

    return this.createResponseMessage(isError, errorMessage, successMessage)
  }

  private createPostResponseMessage(isError?: boolean): string {
    const errorMessage =
      this.messageTitle &&
      `The value ${this.messageTitle} hasn't been added to table ${this.tableName}`
    const successMessage =
      this.messageTitle && `${this.messageTitle} successfully added`

    return this.createResponseMessage(isError, errorMessage, successMessage)
  }

  private getMessage(isError?: boolean) {
    switch (this.requestType) {
      case 'get':
        return this.createGetResponseMessage(isError)
      case 'post':
        return this.createPostResponseMessage(isError)
      default:
        return ''
    }
  }

  succeed({
    message,
    messageTitle,
    data,
  }: ISuccessParams<QueryResult<QueryResultRow>>) {
    this.message = message
    this.messageTitle = messageTitle

    return { status: 200, msg: this.getMessage(), data }
  }
  error({ message, messageTitle, tableName, data }: IErrorParams) {
    this.message = message
    this.messageTitle = messageTitle
    this.tableName = tableName

    return { status: 500, error: this.getMessage(true), data }
  }
}
