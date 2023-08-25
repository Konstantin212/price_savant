import React from 'react'
import Image from 'next/image'
import { ProductData } from '@/mock/products'
import { isUrl } from '@/lib/utils'
import { CurrencyAdapter } from '@/lib/adapters/CurrencyAdapter'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import Button from '@/components/Atoms/Buttons'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Atoms/DropdownMenu'

interface Props {
  tabData: ProductData[]
}

const TabCard = ({ tabData }: Props) => {
  return (
    <>
      {tabData.map(({ name, id, image, shoplist }) => (
        <div
          key={id}
          id='partnerCard'
          className={`min-h-[${
            shoplist ? 400 : 280
          }px] flex max-w-xs flex-col overflow-hidden rounded-md bg-primary p-2 text-gray-50`}
        >
          <div>
            <h3 className='pb-4 pl-8 pt-2 text-left text-xl'>{name}</h3>
          </div>

          <div className='flex min-h-[200px] items-center justify-center bg-white'>
            {isUrl(image) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={name}
                width={300}
                height={300}
                className='w-full object-cover'
              />
            ) : (
              <Image
                src={image}
                alt={name}
                width='300'
                height='300'
                className='w-full object-cover'
              />
            )}
          </div>
          {shoplist &&
            shoplist.map(({ id, name, price, image }, index) => {
              const currencyAdapter = new CurrencyAdapter(price)

              return (
                <div className='grid grid-cols-12 items-center' key={id}>
                  <div className='col-span-7 p-3 pr-0 text-lg'>
                    <h4 className='flex items-center font-bold'>
                      {isUrl(image) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image}
                          alt={name}
                          width={35}
                          height={35}
                          className='mr-2'
                        />
                      ) : (
                        <Image
                          src={image}
                          width={35}
                          height={35}
                          alt={name}
                          className='mr-2'
                        />
                      )}
                      {name}:
                    </h4>
                  </div>
                  <div className='col-span-3 flex justify-start p-3'>
                    <p
                      className={`text-lg ${
                        !index ? 'text-green-300' : 'text-red-400'
                      }`}
                    >
                      {currencyAdapter.getReadablePrice()}$
                    </p>
                  </div>
                  <div className='col-span-2 flex justify-end px-1 py-3'>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='outline-none'>
                        <Button className='rounded-full transition hover:bg-secondary hover:text-primary hover:shadow hover:shadow-secondary'>
                          <EllipsisVerticalIcon className='w-5' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='bg-primary text-white'>
                        <DropdownMenuItem className='transition hover:bg-secondary hover:text-primary'>
                          <a href={`/products/${id}`} className='p-2'>
                            Edit product
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='transition hover:bg-secondary hover:text-primary'>
                          <Button>Delete product</Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })}
        </div>
      ))}
    </>
  )
}

export default TabCard
