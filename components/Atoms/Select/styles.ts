import { SelectVariants } from '@/components/Atoms/Select/types'
import { CSSObjectWithLabel } from 'react-select/dist/declarations/src/types'

export const defaultStyles =
  'w-full border-primary/30 text-sm outline-none transition hover:border-secondary/40 focus:border-secondary'

export const variants: Record<SelectVariants, string> = {
  primary: 'border-b-2',
  bordered: 'border-2 rounded',
}

export const selectStyles = {
  control: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    borderColor: 'initial',
    boxShadow: 'none',
    outline: 'none',
    border: 'none',
  }),
  placeholder: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    color: 'rgb(5 23 38 / 0.5)',
  }),
  indicatorsContainer: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    display: 'none',
  }),
}
