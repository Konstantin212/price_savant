import {
  TypographyAlign,
  TypographyVariants,
} from '@/components/Atoms/Typography/types'

export const variants: Record<TypographyVariants, string> = {
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-xl',
  h4: 'text-lg',
  h5: 'text-base',
  div: 'text-base',
}
export const aligns: Record<TypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}
