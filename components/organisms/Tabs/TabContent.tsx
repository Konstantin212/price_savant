import React, { useEffect, useState } from 'react'
import TabCard from '@/components/organisms/Tabs/TabCard'
import { ProductData } from '@/mock/products'
import FloatingActionButton from '@/components/FloatingActionButton'
import { _get } from '@/lib/api/utils'
import { TabIndexes } from '@/types/enum'
import { ShopInfo } from '@/mock/shopData'

interface Props {
  activeTabId: number
}

const getTabData = async (itemId: number) => {
  const withShops = TabIndexes[itemId] === 'products' ? '?withShops=true' : ''
  const products = await _get(`/api/${TabIndexes[itemId]}${withShops}`)
  const { data } = await products.json()
  return data
}

const TabContent = ({ activeTabId }: Props) => {
  const [tabData, setData] = useState<ProductData[]>([])

  useEffect(() => {
    getTabData(activeTabId).then((productData) => setData(productData))
  }, [activeTabId])

  return (
    <div className='my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {tabData.map(({ name, id, image, shoplist }) => (
        <TabCard<ShopInfo> name={name} key={id} image={image} list={shoplist} />
      ))}
      <FloatingActionButton />
    </div>
  )
}

export default TabContent
