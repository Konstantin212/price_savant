import React from 'react'
import { fonts, sizes, variants } from '@/components/Atoms/Button/styles'
import { clsxMerge } from '@/lib/utils'
import {
  FontType,
  SizeType,
  VariantType,
} from '@/components/Atoms/Button/types'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<{
    variant: VariantType
    size: SizeType
    font: FontType
  }>

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'sm',
  font = 'default',
  onClick,
  children,
  className,
  ...props
}) => {
  const defaultStyles = 'p-2 rounded transition'

  return (
    <button
      className={clsxMerge(
        defaultStyles,
        variants[variant],
        sizes[size],
        fonts[font],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
