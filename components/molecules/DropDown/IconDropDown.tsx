import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Atoms/DropdownMenu'

export type DropdownItem = {
  title: string
  Tag: string | React.ComponentType<any>
  itemAttributes?: any
}

type Props = {
  icon: React.ReactNode
  items: DropdownItem[]
}

const IconDropDown: React.FC<Props> = ({ icon, items }) => {
  if ([icon, items].includes(false)) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>{icon}</DropdownMenuTrigger>
      <DropdownMenuContent className='bg-primary text-white'>
        {items.map(({ title, Tag, itemAttributes }) => (
          <DropdownMenuItem
            key={title + Tag}
            className='transition hover:bg-secondary hover:text-primary'
          >
            <Tag {...itemAttributes}>{title}</Tag>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default IconDropDown
