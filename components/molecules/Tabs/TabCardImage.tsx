import React from 'react'
import { clsxMerge } from '@/lib/utils'
import LinkImage from '@/components/Atoms/LinkImage'

type Props = React.BaseHTMLAttributes<HTMLBaseElement> & {
  image: string
  name: string
}

const TabCardImage: React.FC<Props> = ({ image, name, className }) => {
  return (
    <div
      className={clsxMerge(
        'flex min-h-[200px] items-center justify-center bg-white',
        className
      )}
    >
      <LinkImage
        image={image}
        name={name}
        width={300}
        height={300}
        className='w-full object-cover'
      />
    </div>
  )
}

export default TabCardImage
