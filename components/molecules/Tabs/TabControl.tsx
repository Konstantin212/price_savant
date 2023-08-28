import React from 'react'
import Button from '@/components/Atoms/Button'
import { clsxMerge } from '@/lib/utils'

type Props = {
  id: number
  activeTabId: number
  onClick(id: number): (event: React.MouseEvent) => void
  children: React.ReactElement
}

const TabControl = ({ id, onClick, activeTabId, children }: Props) => {
  return (
    <li key={id} className='flex-1'>
      <Button
        onClick={onClick(id)}
        variant='transparent'
        size='sm'
        className={clsxMerge(
          'mx-auto flex items-center justify-center gap-2 px-1 py-3',
          activeTabId === id &&
            'relative text-blue-700 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-700'
        )}
      >
        {children}
      </Button>
    </li>
  )
}

export default TabControl
