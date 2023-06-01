import React from 'react'
import Link from 'next/link'

const Authorization = () => {
  return (
    <div className='flex w-48 items-center justify-between'>
      <Link href='/sign-in' className='transition hover:text-secondary'>
        Sign In
      </Link>
      <Link href='/sign-up' className='transition hover:text-secondary'>
        Sign Up
      </Link>
    </div>
  )
}

export default Authorization
