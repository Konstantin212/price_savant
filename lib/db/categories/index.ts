import { Base } from '@/lib/db/BaseAbstraction'
import { sql } from '@vercel/postgres'

export class CategoriesBase extends Base {
  async getAllCategories() {
    try {
      const { rows } = await sql`SELECT * FROM categories`
      return { data: rows }
    } catch (e) {
      return { data: null, error: this.errorMsg }
    }
  }
}
