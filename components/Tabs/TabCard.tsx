import React from 'react'
import Image from 'next/image'
import { ProductData } from '@/mock/products'

interface Props {
  tabData: ProductData[]
}

const TabCard = ({ tabData }: Props) => {
  return (
    <>
      {tabData.map(({ title, id, image, shopList }) => (
        <div
          key={id}
          id='partnerCard'
          className='flex min-h-[400px] max-w-xs flex-col overflow-hidden rounded-md bg-primary p-2 text-gray-50'
        >
          <div>
            <h3 className='pb-4 pl-8 pt-2 text-left text-xl'>{title}</h3>
          </div>

          <div className='flex min-h-[200px] items-center justify-center bg-primary'>
            <a
              className='flex max-h-[200px] items-center justify-center overflow-hidden'
              href='#'
              target='_blank'
              rel='noreferrer noopener'
            >
              <Image
                src={image}
                alt='EasyCode'
                width='300'
                height='300'
                className='w-full object-cover'
              />
            </a>
          </div>
          {shopList.map(({ id, name, price, image }, index) => (
            <div className='grid grid-cols-4' key={id}>
              <div className='col-span-3 p-3 pr-0 text-lg'>
                <h4 className='flex items-center font-bold'>
                  <Image
                    src={image}
                    width={35}
                    height={35}
                    alt={name}
                    className='mr-2'
                  />
                  {name}:
                </h4>
              </div>
              <div className='col-span-1 pt-3'>
                <div className='ml-auto w-20'>
                  <p
                    className={`text-lg ${
                      !index ? 'text-green-300' : 'text-red-400'
                    }`}
                  >
                    {price / 100}$
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default TabCard
