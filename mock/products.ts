import { ShopInfo, sortedShopList } from '@/mock/shopData'

export interface ProductData {
  id: number
  title: string
  category: string
  image: string
  shopList: ShopInfo[]
}

export interface ProductsPromise extends Promise<ProductData[]> {}

export const products: ProductsPromise = new Promise((resolve) => {
  resolve([
    {
      id: 1,
      title: 'Lemon',
      category: 'Fruits',
      image:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      shopList: sortedShopList,
    },
    {
      id: 2,
      title: 'Garlic',
      category: 'Vegetables',
      image:
        'https://cdn.pixabay.com/photo/2016/03/05/19/14/garlic-1238337_1280.jpg',
      shopList: sortedShopList,
    },
    {
      id: 3,
      title: 'Lemon',
      category: 'Fruits',
      image:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      shopList: sortedShopList,
    },
    {
      id: 4,
      title: 'Garlic',
      category: 'Vegetables',
      image:
        'https://cdn.pixabay.com/photo/2016/03/05/19/14/garlic-1238337_1280.jpg',
      shopList: sortedShopList,
    },
    {
      id: 6,
      title: 'Lemon',
      category: 'Fruits',
      image:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      shopList: sortedShopList,
    },
    {
      id: 5,
      title: 'Garlic',
      category: 'Vegetables',
      image:
        'https://cdn.pixabay.com/photo/2016/03/05/19/14/garlic-1238337_1280.jpg',
      shopList: sortedShopList,
    },
    {
      id: 7,
      title: 'Lemon',
      category: 'Fruits',
      image:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      shopList: sortedShopList,
    },
    {
      id: 8,
      title: 'Garlic',
      category: 'Vegetables',
      image:
        'https://cdn.pixabay.com/photo/2016/03/05/19/14/garlic-1238337_1280.jpg',
      shopList: sortedShopList,
    },
  ])
})
