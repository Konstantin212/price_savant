import React from 'react'
import Image from 'next/image'
import { ProductData } from '@/mock/products'
import { isUrl } from '@/lib/utils'
import { CurrencyAdapter } from '@/lib/adapters/CurrencyAdapter'

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
            <a
              className='flex max-h-[200px] items-center justify-center overflow-hidden'
              href='#'
              target='_blank'
              rel='noreferrer noopener'
            >
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
            </a>
          </div>
          {shoplist &&
            shoplist.map(({ id, name, price, image }, index) => {
              const currencyAdapter = new CurrencyAdapter(price)

              return (
                <div className='grid grid-cols-4' key={id}>
                  <div className='col-span-3 p-3 pr-0 text-lg'>
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
                  <div className='col-span-1 pt-3'>
                    <div className='ml-auto w-20'>
                      <p
                        className={`text-lg ${
                          !index ? 'text-green-300' : 'text-red-400'
                        }`}
                      >
                        {currencyAdapter.getReadablePrice()}$
                      </p>
                    </div>
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
