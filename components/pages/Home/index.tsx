'use client'

import React, { useEffect, useState } from 'react'
import Tabs from '@/components/templates/Tabs/Tab'
import TabContent from '@/components/organisms/Tabs/TabContent'
import { ToastContainer } from 'react-toastify'

const itemsCounter = [0, 0, 0]

interface Props {
  productsLength: number
  shopsLength: number
  categoriesLength: number
}

const Home: React.FC<Props> = ({
  productsLength,
  shopsLength,
  categoriesLength,
}) => {
  const [activeTabId, setActiveTab] = useState(0)
  const [counters, setCounters] = useState(itemsCounter)

  useEffect(() => {
    setCounters([productsLength, shopsLength, categoriesLength])
  }, [productsLength, shopsLength, categoriesLength])

  const handleTabClick = (id: number) => () => {
    setActiveTab(id)
  }

  return (
    <div>
      <Tabs
        handleTabClick={handleTabClick}
        activeTabId={activeTabId}
        itemsCounter={counters}
      >
        <div className='container mx-auto'>
          <TabContent activeTabId={activeTabId} />
        </div>
      </Tabs>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  )
}

export default Home
