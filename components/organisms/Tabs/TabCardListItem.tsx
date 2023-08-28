import React, { useMemo } from 'react'
import Button from '@/components/Atoms/Button'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import LinkImage from '@/components/Atoms/LinkImage'
import IconDropDown from '@/components/molecules/DropDown/IconDropDown'

type Props = {
  image: string
  name: string
  textColor: string
  price: number
  id: number
  productId: number
}

const TabCardListItem: React.FC<Props> = ({
  image,
  name,
  textColor,
  price,
  id,
  productId,
}) => {
  const dropDownItems = useMemo(
    () => [
      {
        title: 'Edit product',
        Tag: 'a',
        itemAttributes: {
          href: `/products/${productId}?shopId=${id}`,
          className: 'p-2',
        },
      },
      {
        title: 'Delete product',
        Tag: Button,
        itemAttributes: {
          variant: 'transparent',
          className: 'p-2 text-white hover:text-primary',
        },
      },
    ],
    [id, productId]
  )

  return (
    <div className='grid grid-cols-12 items-center'>
      <div className='col-span-7 p-3 pr-0 text-lg'>
        <h4 className='flex items-center font-bold'>
          <LinkImage
            image={image}
            name={name}
            width={35}
            height={35}
            className='mr-2'
          />
          {name}:
        </h4>
      </div>
      <div className='col-span-3 flex justify-start p-3'>
        {/* TODO change currency sign */}
        <p className={`text-lg ${textColor}`}>{price}$</p>
      </div>
      <div className='col-span-2 flex justify-end px-1 py-3'>
        <IconDropDown
          icon={
            <Button className='rounded-full transition hover:bg-secondary hover:text-primary hover:shadow hover:shadow-secondary'>
              <EllipsisVerticalIcon className='w-5' />
            </Button>
          }
          items={dropDownItems}
        />
      </div>
    </div>
  )
}

export default TabCardListItem
