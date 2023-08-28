'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import Button from '@/components/Atoms/Button'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

const BackButton = ({ ...props }: Props) => {
  const router = useRouter()

  return (
    <Button
      type='button'
      font='lily'
      variant='gray'
      size='sm'
      className='flex items-center'
      onClick={router.back}
      {...props}
    >
      <ArrowLeftIcon className='mr-2 w-5' /> Back
    </Button>
  )
}

export default BackButton
