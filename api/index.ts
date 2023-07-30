import { _get } from '@/lib/api/utils'

export async function getShops() {
  const res = await _get('/api/shops')
  return res.json()
}
export async function getCategories() {
  const res = await _get('/api/categories')
  return res.json()
}
