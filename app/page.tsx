import Main from '@/components/Main'
import { sql } from '@vercel/postgres'
import { createDB } from '@/lib/seeds'

export const runtime = 'edge'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export default async function Home() {
  let shops
  try {
    shops = await sql`SELECT * FROM shops`
  } catch (e: any) {
    if (e.message === `relation "products" does not exist`) {
      console.log(
        'Table does not exist, creating and seeding it with dummy data now...'
      )
      // Table is not created yet
      await createDB()
    } else {
      throw e
    }
  }
  return <Main />
}
