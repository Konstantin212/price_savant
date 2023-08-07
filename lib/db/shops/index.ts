import { QueryResultRow, sql } from '@vercel/postgres'
import { Base } from '@/lib/db/BaseAbstraction'
import { IDBRequestResult } from '@/lib/api/types'
import isEmpty from 'lodash.isempty'
import { IDBInput } from '@/lib/db/types'
import { DBRequestError, handleError } from '@/lib/db/utils'
import { PricesBase } from '@/lib/db/prices'
import { Shop } from '@/types/interface'

const pricesBase = new PricesBase()

export class ShopsBase extends Base {
  async getAllShops(): Promise<QueryResultRow[] | DBRequestError> {
    try {
      const { rows } =
        await sql`SELECT id, TRIM(name) as name, image FROM shops ORDER BY name`
      return rows
    } catch (e) {
      return handleError(e)
    }
  }

  async getRelatedToProductShops({
    productId,
  }: {
    productId: string
  }): Promise<QueryResultRow[] | DBRequestError> {
    try {
      const shopIds = await pricesBase.getProductPrice({ productId })

      const allShopsData = (await this.getAllShops()) as Shop[]

      if (!allShopsData) return handleError("Can't get shops")

      const idList = shopIds?.map((shop) => shop.shop_id).sort()

      return allShopsData.filter((shop) => !idList?.includes(shop.id))
    } catch (e) {
      return handleError(e)
    }
  }

  async getShopLength() {
    try {
      const { rows } = await sql`SELECT COUNT(*) FROM shops`
      return { data: rows }
    } catch (e) {
      handleError(e)
    }
  }

  async createShop({
    name,
    image,
  }: IDBInput): Promise<IDBRequestResult | undefined> {
    try {
      const isShopAlreadyExists =
        await sql`SELECT id FROM shops WHERE name = ${name}`

      if (!isEmpty(isShopAlreadyExists.rows)) {
        return { error: 'This shop name is already exists' }
      }

      return {
        result:
          await sql`INSERT INTO Shops (name, image) VALUES (${name}, ${image})`,
      }
    } catch (err) {
      handleError(err)
    }
  }
}
