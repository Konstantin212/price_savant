import React from 'react'
import { InputVariants } from '@/components/Atoms/Inputs/types'
import { clsxMerge } from '@/lib/utils'
import { defaultStyles, variants } from '@/components/Atoms/Inputs/styles'

type Props = React.InputHTMLAttributes<HTMLInputElement> &
  Partial<{
    variant: InputVariants
  }>

const Input = ({
  type = 'text',
  variant = 'primary',
  className,
  ...props
}: Props) => {
  return (
    <input
      className={clsxMerge(defaultStyles, variants[variant], className)}
      type={type}
      {...props}
    />
  )
}

export default Input
