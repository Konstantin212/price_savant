import { NextResponse } from 'next/server'
import { db } from '@vercel/postgres'

export async function GET() {
  const client = await db.connect()

  try {
    await client.sql`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name CHAR(100) NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name CHAR(100) NOT NULL,
      image BYTEA,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS shops (
      id SERIAL PRIMARY KEY,
      name CHAR(100) NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      "first_name" varchar,
      "last_name" varchar,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS prices (
      id SERIAL PRIMARY KEY,
      price INTEGER NOT NULL,
      product_id INTEGER,
      shop_id INTEGER,
      category_id INTEGER,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    ALTER TABLE "prices" ADD FOREIGN KEY ("shop_id") REFERENCES "shops" ("id");

    ALTER TABLE "prices" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
    
    ALTER TABLE "prices" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
    `
  } catch (error) {
    return NextResponse.json({ error })
  }

  return NextResponse.json({ status: 200 })
}
