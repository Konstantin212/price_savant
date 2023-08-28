import React from 'react'

type Props = {
  children: React.ReactNode
}

const Badge = ({ children }: Props) => {
  return (
    <span className='inline-block rounded-full bg-gray-300 px-4 py-1 py-1 text-center text-xs font-semibold leading-none text-gray-700'>
      {children}
    </span>
  )
}

export default Badge
