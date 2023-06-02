import React from 'react'
import TabCard from '@/components/Tabs/TabCard'

interface Props {
  activeTab: number
}

export interface Shop {
  id: number
  name: string
  image: string
  price: number
}

const shopList: Shop[] = [
  {
    id: 1,
    name: 'Kaufland',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Kaufland_Logo.svg/1200px-Kaufland_Logo.svg.png',
    price: 75,
  },
  {
    id: 2,
    name: 'Aldi',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Aldi_Nord_201x_logo.svg/1200px-Aldi_Nord_201x_logo.svg.png',
    price: 95,
  },
]

const sortedShopList = shopList.sort((a, b) => a.price - b.price)

const TabContent = ({ activeTab }: Props) => {
  console.log('activeTab')
  console.log(activeTab)
  return (
    <div className='my-10'>
      <TabCard title='Lemon' shopList={sortedShopList} />
    </div>
  )
}

export default TabContent
