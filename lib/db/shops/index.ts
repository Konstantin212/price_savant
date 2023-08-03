import { QueryResultRow, sql } from '@vercel/postgres'
import { Base } from '@/lib/db/BaseAbstraction'
import { IDBRequestResult } from '@/lib/api/types'
import isEmpty from 'lodash.isempty'
import { IDBInput } from '@/lib/db/types'
import { handleError } from '@/lib/db/utils'

export class ShopsBase extends Base {
  async getAllShops(): Promise<QueryResultRow[] | null> {
    try {
      const { rows } = await sql`SELECT *, TRIM(name) FROM shops ORDER BY name`
      return rows
    } catch (e) {
      handleError(e)
    }

    return null
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
