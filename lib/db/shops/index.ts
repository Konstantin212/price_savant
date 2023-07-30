import { sql } from '@vercel/postgres'
import { Base } from '@/lib/db/BaseAbstraction'

export class ShopsBase extends Base {
  async getAllShops() {
    try {
      const { rows } = await sql`SELECT * FROM shops`
      return { data: rows }
    } catch (e) {
      return { data: null, error: this.errorMsg }
    }
  }
}
