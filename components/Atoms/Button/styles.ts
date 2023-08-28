import {
  FontType,
  SizeType,
  VariantType,
} from '@/components/Atoms/Button/types'

export const variants: Record<VariantType, string> = {
  primary:
    'bg-primary text-white hover:bg-secondary hover:text-primary disabled:bg-primary/20 disabled:text-primary',
  secondary: '',
  transparent: 'text-gray-500 hover:text-blue-700',
  gray: 'bg-primary/30  text-white hover:bg-secondary hover:text-primary disabled:bg-primary/20 disabled:text-primary',
}

export const sizes: Record<SizeType, string> = {
  xs: '',
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2 text-xl',
  lg: '',
  xl: '',
}

export const fonts: Record<FontType, string> = {
  lily: 'font-lily',
  prosto: 'font-prosto',
  default: 'font-default',
}
