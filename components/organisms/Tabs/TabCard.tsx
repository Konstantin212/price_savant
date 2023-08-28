import React from 'react'
import { CurrencyAdapter } from '@/lib/adapters/CurrencyAdapter'
import { ShopInfo } from '@/mock/shopData'
import Typography from '@/components/Atoms/Typography'
import TabCardImage from '@/components/molecules/Tabs/TabCardImage'
import TabCardListItem from '@/components/organisms/Tabs/TabCardListItem'

type Props<L> = {
  name: string
  image: string
  list?: L[]
}

// TODO: replace ShopInfo with more common type
const TabCard = <L extends ShopInfo>({ list, name, image }: Props<L>) => {
  const listHeightStyle = list ? 'min-h-[400px]' : 'min-h-[280px]'
  return (
    <div
      id='partnerCard'
      className={`${listHeightStyle} flex max-w-xs flex-col overflow-hidden rounded-md bg-primary p-2 text-gray-50`}
    >
      <Typography variant='h3' className='pb-4 pl-8 pt-2'>
        {name}
      </Typography>
      <TabCardImage image={image} name={name} />
      {list?.map(({ id, name, price, image }, index) => {
        const currencyAdapter = new CurrencyAdapter(price)

        return (
          <TabCardListItem
            key={id}
            id={id}
            image={image}
            name={name}
            price={currencyAdapter.getReadablePrice()}
            textColor={!index ? 'text-green-300' : 'text-red-400'}
          />
        )
      })}
    </div>
  )
}

export default TabCard
