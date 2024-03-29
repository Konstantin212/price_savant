import React, { useEffect, useState } from 'react'
import TabCard from '@/components/Tabs/TabCard'
import { data } from '@/mock/productData'
import { ProductData } from '@/mock/products'
import FloatingActionButton from '@/components/FloatingActionButton'

interface Props {
  activeTabId: number
}

const getTabData = (itemId: number) => {
  return data[itemId]
}

const TabContent = ({ activeTabId }: Props) => {
  const [tabData, setData] = useState<ProductData[]>([])

  useEffect(() => {
    getTabData(activeTabId).then((productData) => setData(productData))
  }, [activeTabId])

  return (
    <div className='my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <TabCard tabData={tabData} />
      <FloatingActionButton />
    </div>
  )
}

export default TabContent
