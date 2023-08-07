import { sql } from '@vercel/postgres'

export async function categoriesTable() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name CHAR(100) NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      image TEXT
    );
    `
  console.log(`Created "categories" table`)

  return {
    createTable,
  }
}
