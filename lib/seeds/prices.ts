import { sql } from '@vercel/postgres'

export async function pricesTable() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS prices (
      id SERIAL PRIMARY KEY,
      price INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      shop_id INTEGER NOT NULL,
      category_id INTEGER NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    ALTER TABLE "prices" ADD FOREIGN KEY ("shop_id") REFERENCES "shops" ("id");

    ALTER TABLE "prices" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
    
    ALTER TABLE "prices" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
    `
  console.log(`Created "prices" table`)

  return {
    createTable,
  }
}
