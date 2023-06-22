import { NextResponse } from 'next/server'
import { db } from '@vercel/postgres'

export async function GET() {
  const client = await db.connect()
  let query

  try {
    query = await client.sql`SELECT * FROM shops`
  } catch (error) {
    return NextResponse.json({ error })
  }

  return NextResponse.json({ status: 200, data: query.rows })
}
