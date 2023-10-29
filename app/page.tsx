import { getInitialData } from '@/app/utils'
import Home from '@/components/pages/Home'

export const runtime = 'edge'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const { shopData, categoriesData, productsData } = await getInitialData()

  if (!shopData || !categoriesData || !productsData) return 'Error'

  const counters = [
    productsData.data.at(0)?.count,
    shopData.data.at(0)?.count,
    categoriesData.data.at(0)?.count,
  ]

  if (counters.some((c) => !c)) return 'Error'

  const [productLength, shopsLength, categoriesLength] = counters

  return (
    <Home
      productsLength={productLength}
      shopsLength={shopsLength}
      categoriesLength={categoriesLength}
    />
  )
}
