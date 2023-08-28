import React from 'react'
import { clsxMerge } from '@/lib/utils'
import { LabelVariants } from '@/components/Atoms/Label/types'
import { defaultStyles, variants } from '@/components/Atoms/Label/styles'

type Props = React.LabelHTMLAttributes<HTMLLabelElement> &
  Partial<{
    variant: LabelVariants
  }>

const Label = ({
  className,
  children,
  variant = 'primary',
  ...props
}: Props) => {
  return (
    <label
      className={clsxMerge(defaultStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </label>
  )
}

export default Label
