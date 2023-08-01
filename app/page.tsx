import Main from '@/components/Main'
import { getInitialData } from '@/app/utils'

export const runtime = 'edge'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export default async function Home() {
  const { shopData, categoriesData, productsData } = await getInitialData()

  return (
    <Main
      productsLength={productsData?.data?.[0]?.count}
      shopsLength={shopData?.data?.[0]?.count}
      categoriesLength={categoriesData?.data?.[0]?.count}
    />
  )
}
