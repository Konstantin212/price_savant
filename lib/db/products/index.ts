import { sql } from '@vercel/postgres'
import { Base } from '@/lib/db/BaseAbstraction'
import { IDBRequestResult } from '@/lib/api/types'
import isEmpty from 'lodash.isempty'
import { IDBInput } from '@/lib/db/types'

interface IProductDBInput extends IDBInput {
  shopId: string
  price: string
  categoryId: string
}

export class ProductsBase extends Base {
  async getAllProducts() {
    try {
      const { rows } = await sql`SELECT * FROM products`
      return { data: rows }
    } catch (e) {
      return { data: null, error: this.errorMsg }
    }
  }

  async getProductsLength() {
    try {
      const { rows } = await sql`SELECT COUNT(*) FROM products`
      return { data: rows }
    } catch (e) {
      throw new Error(e as string)
    }
  }

  async getProductByName(name: string) {
    return await sql`SELECT id FROM products WHERE name = ${name}`
  }

  async createProduct({
    name,
    price,
    categoryId,
    image,
    shopId,
  }: IProductDBInput): Promise<IDBRequestResult> {
    const product = await this.getProductByName(name)
    let productId = product.rows[0]?.id

    if (isEmpty(product.rows)) {
      await sql`INSERT INTO Products (name, image) VALUES (${name}, ${image})`
      const newProduct = await this.getProductByName(name)

      productId = newProduct.rows[0]?.id
    }

    try {
      const isPriceForThisProductExists =
        await sql`SELECT id FROM prices WHERE product_id = ${productId} AND shop_id = ${shopId}`
      if (!isEmpty(isPriceForThisProductExists.rows)) {
        return { error: 'This product in this shop is already exists' }
      }

      return {
        result:
          await sql`INSERT INTO Prices (price, product_id, shop_id, category_id) VALUES (${price}, ${productId}, ${shopId}, ${categoryId})`,
      }
    } catch (e) {
      return { error: e as string }
    }
  }
}
