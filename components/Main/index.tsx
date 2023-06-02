'use client'

import React, { useState } from 'react'
import Tabs from '@/components/Tabs'
import TabContent from '@/components/Tabs/TabContent'

const itemsCounter = {
  1: 6,
  2: 10,
  3: 2,
}

const Main = () => {
  const [activeTab, setActiveTab] = useState(1)

  const handleTabClick = (id: number) => () => {
    setActiveTab(id)
  }

  return (
    <div>
      <Tabs
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        itemsCounter={itemsCounter}
      >
        <div className='container mx-auto'>
          <TabContent activeTab={activeTab} />
        </div>
      </Tabs>
    </div>
  )
}

export default Main
