import React from 'react'
import Badge from '@/components/Atoms/Badge'

type Props = {
  title: string
  counter: number
}

const TabControlTitle = ({ title, counter }: Props) => {
  return (
    <>
      {title} <Badge>{counter}</Badge>
    </>
  )
}

export default TabControlTitle
