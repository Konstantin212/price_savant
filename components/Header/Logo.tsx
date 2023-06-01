import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href='/' title='Home'>
      <Image
        src='/logo-no-background.svg'
        width={150}
        height={150}
        alt='Price Savant'
      />
    </Link>
  )
}

export default Logo
