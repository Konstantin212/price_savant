'use client'

import React, { useState } from 'react'
import Tabs from '@/components/Tabs'
import TabContent from '@/components/Tabs/TabContent'
import { ToastContainer } from 'react-toastify'

const itemsCounter = {
  1: 6,
  2: 10,
  3: 2,
}

const Main = () => {
  const [activeTabId, setActiveTab] = useState(1)

  const handleTabClick = (id: number) => () => {
    setActiveTab(id)
  }

  return (
    <div>
      <Tabs
        handleTabClick={handleTabClick}
        activeTabId={activeTabId}
        itemsCounter={itemsCounter}
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

export default Main
