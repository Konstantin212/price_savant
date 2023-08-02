import { sql } from '@vercel/postgres'
import { Base } from '@/lib/db/BaseAbstraction'
import { IDBRequestResult } from '@/lib/api/types'
import isEmpty from 'lodash.isempty'
import { IDBInput, TBooleanString } from '@/lib/db/types'

interface IProductDBInput extends IDBInput {
  shopId: string
  price: string
  categoryId: string
}

export class ProductsBase extends Base {
  async selectProductsWithShops() {
    const { rows } = await sql`SELECT Products.*, 
                    TRIM(Products.name) as name, 
                    ROUND(AVG(Prices.price), 2), 
                    json_agg(json_build_object('id', Prices.shop_id, 'name', TRIM(Shops.name), 'image', Shops.image, 'price', Prices.price)) as shopList
                FROM Products
                INNER JOIN Prices ON Products.id = Prices.product_id
                INNER JOIN Shops ON Shops.id = Prices.shop_id
                GROUP BY Products.id
                ORDER BY Products.name`

    return rows
  }
  async selectAllProducts() {
    const { rows } = await sql`SELECT * FROM Products`

    return rows
  }
  async getAllProducts(withShops: TBooleanString): Promise<{ result: any[] }> {
    try {
      const rows = withShops
        ? await this.selectProductsWithShops()
        : await this.selectAllProducts()

      return { result: rows }
    } catch (e) {
      console.error(e)
      throw new Error(e as string)
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
