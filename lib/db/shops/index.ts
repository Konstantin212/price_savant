import { sql } from '@vercel/postgres'
import { Base } from '@/lib/db/BaseAbstraction'
import { IDBRequestResult } from '@/lib/api/types'
import isEmpty from 'lodash.isempty'

export class ShopsBase extends Base {
  async getAllShops() {
    try {
      const { rows } = await sql`SELECT * FROM shops`
      return { data: rows }
    } catch (e) {
      return { data: null, error: this.errorMsg }
    }
  }

  async createShop({ name, image }: IDBInput): Promise<IDBRequestResult> {
    const isShopAlreadyExists =
      await sql`SELECT id FROM shops WHERE name = ${name}`

    if (!isEmpty(isShopAlreadyExists.rows)) {
      return { error: 'This shop name is already exists' }
    }

    return {
      result:
        await sql`INSERT INTO Shops (name, image) VALUES (${name}, ${image})`,
    }
  }
}
