import React from 'react'
import { Encode_Sans, Lily_Script_One, Prosto_One } from 'next/font/google'
import { Metadata } from 'next'
import Header from '@/components/Header'
import 'react-toastify/ReactToastify.min.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Price Savant - Compare Grocery Prices',
  authors: [{ name: 'Kostiantyn Prykhodko', url: 'https: kprykhodko.com' }],
  robots: 'index, follow',
  description:
    'Price Savant - Compare prices for groceries and find the best deals.',
  keywords:
    'price comparison, grocery prices, compare prices, best deals, grocery shopping',
  openGraph: {
    title: 'Price Savant - Compare Grocery Prices',
    description:
      'Find the best deals and compare prices for groceries on Price Savant.',
    // TODO: add image url
    url: 'http:price-savant.com',
  },
}

const prosto = Prosto_One({
  weight: '400',
  variable: '--font-prosto',
  subsets: ['latin'],
  display: 'swap',
})

const lily = Lily_Script_One({
  weight: '400',
  variable: '--font-lily',
  subsets: ['latin'],
  display: 'swap',
})

const encode = Encode_Sans({
  weight: ['100', '400', '600'],
  variable: '--font-encode',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${prosto.variable} ${encode.variable} ${lily.variable} h-full font-default`}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
