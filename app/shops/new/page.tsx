import React from 'react'
import BackButton from '@/components/Atoms/Buttons/BackButton'
import ShopPage from '@/components/ShopPage'

const NewShop = () => {
  return (
    <div className='container mx-auto min-h-[calc(100%-87px)] py-10'>
      <BackButton />
      <h1 className='w-full text-center text-3xl font-bold'>Add new shop</h1>
      <div className='flex min-h-[calc(100%-87px-120px)] flex-wrap items-center px-44'>
        <ShopPage />
      </div>
    </div>
  )
}

export default NewShop
