import { sql } from '@vercel/postgres'

export async function productsTable() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name CHAR(100) NOT NULL,
      image TEXT,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `
  console.log(`Created "products" table`)

  return {
    createTable,
  }
}
