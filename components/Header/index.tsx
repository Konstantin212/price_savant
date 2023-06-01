import React from 'react'
import Authorization from '@/components/Header/Authorization'
import Search from '@/components/Header/Search'
import Logo from '@/components/Header/Logo'

const Header = () => {
  return (
    <div className='bg-primary text-white shadow-md'>
      <div className='container mx-auto flex items-center justify-between py-5'>
        <Logo />
        <Search />
        <Authorization />
      </div>
    </div>
  )
}

export default Header
