import { getInitialData } from '@/app/utils'
import Home from '@/components/pages/Home'

export const runtime = 'edge'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const { shopData, categoriesData, productsData } = await getInitialData()
  const counters = [
    productsData?.data?.[0]?.count,
    shopData?.data?.[0]?.count,
    categoriesData?.data?.[0]?.count,
  ]

  if (counters.some((c) => !c)) return 'Error'

  return (
    <Home
      productsLength={counters[0]}
      shopsLength={counters[1]}
      categoriesLength={counters[2]}
    />
  )
}
