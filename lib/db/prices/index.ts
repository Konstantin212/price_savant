import { Base } from '@/lib/db/BaseAbstraction'
import { QueryResultRow, sql } from '@vercel/postgres'
import { DBRequestError, handleError } from '@/lib/db/utils'
import { Price } from '@/types/interface'

interface CustomProductPrice extends QueryResultRow, Price {}
type ValidPricePropertyName = Partial<{ [key in keyof Price]: number }>

export class PricesBase extends Base {
  async getProductPrice({
    productId,
    shopId,
  }: {
    productId: string
    shopId: string
  }): Promise<CustomProductPrice[] | null> {
    try {
      const { rows } =
        await sql`SELECT * FROM prices WHERE product_id = ${productId} AND shop_id=${shopId}`
      return rows as CustomProductPrice[]
    } catch (e) {
      handleError(e)
    }

    return null
  }

  async updatePrice({
    productId,
    values,
  }: {
    productId: string
    values: ValidPricePropertyName
  }): Promise<CustomProductPrice | DBRequestError> {
    try {
      const { rows } =
        await sql`UPDATE prices SET price = ${values.price}, shop_id = ${values.shop_id}, category_id = ${values.category_id} WHERE product_id = ${productId} AND shop_id = ${values.shop_id}`
      return rows[0] as CustomProductPrice
    } catch (e) {
      return handleError(e)
    }
  }
}
