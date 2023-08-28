import React from 'react'
import TabControl from '@/components/molecules/Tabs/TabControl'
import TabControlTitle from '@/components/molecules/Tabs/TabControlTitle'

interface Props {
  handleTabClick(id: number): (event: React.MouseEvent) => void
  activeTabId: number
  itemsCounter: { [key: number]: number }
  children: React.ReactElement
}

interface TabButtons {
  id: number
  type?: 'button' | 'submit' | 'reset' | undefined
  title: string
}

const tabButtons: TabButtons[] = [
  { id: 0, title: 'My Products' },
  { id: 1, title: 'My Shops' },
  { id: 2, title: 'My Categories' },
]

const Tabs = ({
  handleTabClick,
  activeTabId,
  itemsCounter,
  children,
}: Props) => {
  return (
    <div>
      <div className='border-b border-b-gray-200'>
        <ul className='container mx-auto -mb-px flex items-center gap-4 text-sm font-medium'>
          {tabButtons.map(({ id, title }) => (
            <TabControl
              key={id}
              id={id}
              onClick={handleTabClick}
              activeTabId={activeTabId}
            >
              <TabControlTitle title={title} counter={itemsCounter[id]} />
            </TabControl>
          ))}
        </ul>
      </div>
      {children}
    </div>
  )
}

export default Tabs
