import { Base } from '@/lib/db/BaseAbstraction'
import { sql } from '@vercel/postgres'
import isEmpty from 'lodash.isempty'
import { IDBRequestResult } from '@/lib/api/types'

export class CategoriesBase extends Base {
  async getAllCategories() {
    try {
      const { rows } = await sql`SELECT * FROM categories`
      return { data: rows }
    } catch (e) {
      return { data: null, error: this.errorMsg }
    }
  }

  async createCategory({ name, image }: IDBInput): Promise<IDBRequestResult> {
    const isItemAlreadyExists =
      await sql`SELECT id FROM categories WHERE name = ${name}`

    if (!isEmpty(isItemAlreadyExists.rows)) {
      return { error: 'This category name is already exists' }
    }

    return {
      result:
        await sql`INSERT INTO Categories (name, image) VALUES (${name}, ${image})`,
    }
  }
}
