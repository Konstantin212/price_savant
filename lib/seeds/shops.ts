import { sql } from '@vercel/postgres'

export async function shopsTable() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS shops (
      id SERIAL PRIMARY KEY,
      name CHAR(100) NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      image TEXT
    );
    `
  console.log(`Created "shops" table`)

  return {
    createTable,
  }
}
