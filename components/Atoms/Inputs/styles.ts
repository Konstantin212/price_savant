import { InputVariants } from '@/components/Atoms/Inputs/types'

export const defaultStyles = 'w-full px-5 py-3 text-sm outline-none transition'

export const variants: Record<InputVariants, string> = {
  primary:
    'hover:border-secondary/40 focus:border-secondary border-primary/30 border-b-2',
  bordered:
    'hover:border-secondary/40 focus:border-secondary border-primary/30 border-2 rounded',
}
