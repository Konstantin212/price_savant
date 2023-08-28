import React from 'react'
import { isUrl } from '@/lib/utils'
import Image from 'next/image'

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> & {
  image: string
  name: string
  width: number
  height: number
}

const LinkImage: React.FC<Props> = ({ image, name, ...props }) => {
  const ImageComponent = isUrl(image) ? 'img' : Image

  return <ImageComponent src={image} alt={name} {...props} />
}

export default LinkImage
