import React from 'react'
import {
  TypographyAlign,
  TypographyVariants,
} from '@/components/Atoms/Typography/types'
import { clsxMerge } from '@/lib/utils'
import { aligns, variants } from '@/components/Atoms/Typography/styles'

type Props = React.BaseHTMLAttributes<HTMLBaseElement> &
  Partial<{
    variant: TypographyVariants
    align: TypographyAlign
  }>

const Typography: React.FC<Props> = ({
  variant = 'div',
  align = 'left',
  className,
  children,
}) => {
  const Tag = variant
  return (
    <Tag className={clsxMerge(variants[variant], aligns[align], className)}>
      {children}
    </Tag>
  )
}

export default Typography
