import { usersTable } from '@/lib/seeds/users'
import { categoriesTable } from '@/lib/seeds/categories'
import { shopsTable } from '@/lib/seeds/shops'
import { productsTable } from '@/lib/seeds/products'
import { pricesTable } from '@/lib/seeds/prices'

export async function createDB() {
  await Promise.all([
    usersTable(),
    categoriesTable(),
    shopsTable(),
    productsTable(),
    pricesTable(),
  ])
}
