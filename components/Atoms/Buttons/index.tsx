import React from 'react'
import { sizes, variants } from '@/components/Atoms/Buttons/styles'
import { clsxMerge } from '@/lib/utils'
import { SizeType, VariantType } from '@/components/Atoms/Buttons/types'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType
  size?: SizeType
}

const Button: React.FC<Props> = ({
  variant = 'primary',
  size = 'sm',
  onClick,
  children,
  className,
  ...props
}) => {
  const defaultStyles = 'p-2'

  return (
    <button
      className={clsxMerge(
        variants[variant],
        sizes[size],
        defaultStyles,
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
