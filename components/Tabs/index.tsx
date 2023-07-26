import React from 'react'

interface Props {
  handleTabClick(id: number): (event: React.MouseEvent) => void
  activeTabId: number
  itemsCounter: { [key: number]: number }
  children: React.ReactElement
}

interface TabButtons {
  id: number
  type: 'button' | 'submit' | 'reset' | undefined
  title: string
}

const tabButtons: TabButtons[] = [
  { id: 1, type: 'button', title: 'My Products' },
  { id: 2, type: 'button', title: 'My Shops' },
  { id: 3, type: 'button', title: 'My Categories' },
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
          {tabButtons.map(({ id, type, title }) => (
            <li key={id} className='flex-1'>
              <button
                onClick={handleTabClick(id)}
                type={type}
                className={`mx-auto flex items-center justify-center gap-2 px-1 py-3 transition ${
                  activeTabId === id
                    ? 'relative text-blue-700 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-700 hover:text-blue-700'
                    : 'text-gray-500 hover:text-blue-700'
                }`}
              >
                {title}{' '}
                <span className='inline-block rounded-full bg-gray-300 px-4 py-1 py-1 text-center text-xs font-semibold leading-none text-gray-700'>
                  {itemsCounter[id]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {children}
    </div>
  )
}

export default Tabs
