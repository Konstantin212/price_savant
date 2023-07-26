'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
const BackButton = () => {
  const router = useRouter()

  return (
    <button
      className='flex items-center rounded bg-primary/30 px-4 py-2 font-lily text-xl text-white transition hover:bg-secondary hover:text-primary disabled:bg-primary/20 disabled:text-primary'
      onClick={router.back}
    >
      <ArrowLeftIcon className='mr-2 w-5' /> Back
    </button>
  )
}

export default BackButton
