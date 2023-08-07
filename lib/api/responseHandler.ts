import { QueryResult, QueryResultRow } from '@vercel/postgres'
import { RequestType } from '@/lib/api/types'
import {
  IErrorParams,
  IResponseHandler,
  ISuccessParams,
} from '@/lib/api/responseHandlerTypes'

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
    let customMessage

    if (isError) {
      customMessage = errorMessage || this.defaultErrorMessage
    } else {
      customMessage = successMessage || this.defaultSuccessMessage
    }

    return this.message || customMessage
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

  private createPutResponseMessage(isError?: boolean): string {
    const errorMessage =
      this.messageTitle &&
      `The value ${this.messageTitle} hasn't been updated in the table ${this.tableName}`
    const successMessage =
      this.messageTitle && `${this.messageTitle} successfully updated`

    return this.createResponseMessage(isError, errorMessage, successMessage)
  }

  private getMessage(isError?: boolean) {
    switch (this.requestType) {
      case 'get':
        return this.createGetResponseMessage(isError)
      case 'post':
        return this.createPostResponseMessage(isError)
      case 'put':
        return this.createPutResponseMessage(isError)
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
