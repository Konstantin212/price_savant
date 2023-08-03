import { Base } from '@/lib/db/BaseAbstraction'
import { QueryResultRow, sql } from '@vercel/postgres'
import isEmpty from 'lodash.isempty'
import { IDBRequestResult } from '@/lib/api/types'
import { IDBInput } from '@/lib/db/types'
import { handleError } from '@/lib/db/utils'

export class CategoriesBase extends Base {
  async getAllCategories(): Promise<QueryResultRow[] | null> {
    try {
      const { rows } =
        await sql`SELECT *, TRIM(name) FROM categories ORDER BY name`
      return rows
    } catch (e) {
      handleError(e)
    }

    return null
  }

  async getCategoriesLength() {
    try {
      const { rows } = await sql`SELECT COUNT(*) FROM categories`
      return { data: rows }
    } catch (e) {
      throw new Error(e as string)
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
