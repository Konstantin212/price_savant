import { sql } from '@vercel/postgres'

export async function usersTable() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      "first_name" varchar,
      "last_name" varchar,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `
  console.log(`Created "users" table`)

  return {
    createTable,
  }
}
