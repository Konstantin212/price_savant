import Main from '@/components/Main'
import { getInitialData } from '@/app/utils'

export const runtime = 'edge'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export default async function Home() {
  const { shopData, categoriesData, productsData } = await getInitialData()

  if (
    [
      productsData?.data?.[0]?.count,
      shopData?.data?.[0]?.count,
      categoriesData?.data?.[0]?.count,
    ].some((i) => !i)
  )
    return 'Error'

  return (
    <Main
      productsLength={productsData?.data?.[0]?.count}
      shopsLength={shopData?.data?.[0]?.count}
      categoriesLength={categoriesData?.data?.[0]?.count}
    />
  )
}
