import { QueryResultRow, sql } from '@vercel/postgres'
import { Base } from '@/lib/db/BaseAbstraction'
import { IDBRequestResult } from '@/lib/api/types'
import isEmpty from 'lodash.isempty'
import { IDBInput, TBooleanString } from '@/lib/db/types'
import { CurrencyAdapter } from '@/lib/adapters/CurrencyAdapter'
import { handleError } from '@/lib/db/utils'
import { Product } from '@/types/interface'
import { PricesBase } from '@/lib/db/prices'

interface IProductDBInput extends IDBInput {
  shopId: string
  price: string
  categoryId: string
}

interface IProductUpdateDBInput extends IDBInput, IProductDBInput {
  id: string
}

interface ProductRow extends QueryResultRow, Product {}

export class ProductsBase extends Base {
  private async selectProductsWithShops() {
    const { rows } = await sql`SELECT Products.*, 
                    TRIM(Products.name) as name, 
                    ROUND(AVG(Prices.price), 2), 
                    json_agg(json_build_object('id', Prices.shop_id, 'name', TRIM(Shops.name), 'image', Shops.image, 'price', Prices.price) ORDER BY price, Shops.name) as shopList
                FROM Products
                INNER JOIN Prices ON Products.id = Prices.product_id
                INNER JOIN Shops ON Shops.id = Prices.shop_id
                GROUP BY Products.id
                ORDER BY Products.name`

    return rows
  }
  private async selectAllProducts() {
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

  private async getProductByName(name: string) {
    return await sql`SELECT id FROM products WHERE name = ${name}`
  }

  async getProduct(id: string): Promise<ProductRow | null> {
    try {
      if (!id) throw new Error('Product do not exists')

      const { rows } =
        await sql`SELECT *, TRIM(name) as name FROM products WHERE id = ${id}`
      return rows[0] as ProductRow
    } catch (e) {
      handleError(e)
    }

    return null
  }

  async getProductsLength() {
    try {
      const { rows } = await sql`SELECT COUNT(*) FROM products`
      return { data: rows }
    } catch (e) {
      throw new Error(e as string)
    }
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

      const currencyAdapter = new CurrencyAdapter(price)
      const priceInCents = currencyAdapter.getCentPrice()

      return {
        result:
          await sql`INSERT INTO Prices (price, product_id, shop_id, category_id) VALUES (${priceInCents}, ${productId}, ${shopId}, ${categoryId})`,
      }
    } catch (e) {
      return handleError(e)
    }
  }

  async updateProduct({
    id,
    name,
    price,
    categoryId,
    image,
    shopId,
  }: IProductUpdateDBInput): Promise<IDBRequestResult> {
    const Prices = new PricesBase()

    const product = await this.getProduct(id)
    const productPrice = await Prices.getProductPrice({ productId: id, shopId })

    if (isEmpty(product) || isEmpty(productPrice)) {
      return handleError('Product does not exists')
    }

    try {
      const currencyAdapter = new CurrencyAdapter(price)
      const priceInCents = currencyAdapter.getCentPrice()

      await Prices.updatePrice({
        productId: id,
        values: {
          price: priceInCents,
          shop_id: Number(shopId),
          category_id: Number(categoryId),
        },
      })

      const result =
        await sql`UPDATE products SET name = ${name}, image = ${image}, updatedat = to_timestamp(${Date.now()} / 1000.0) WHERE id = ${id}`

      return { result }
    } catch (e) {
      return handleError('Product does not exists')
    }
  }
}
