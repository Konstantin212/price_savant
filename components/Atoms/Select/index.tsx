import React from 'react'
import Select, { Props as SelectProps } from 'react-select'
import { SelectVariants } from '@/components/Atoms/Select/types'
import { clsxMerge } from '@/lib/utils'
import {
  defaultStyles,
  selectStyles,
  variants,
} from '@/components/Atoms/Select/styles'

type Props = SelectProps & Partial<{ variant: SelectVariants }>

const SelectInput = ({ className, variant = 'primary', ...props }: Props) => {
  return (
    <Select
      styles={selectStyles}
      className={clsxMerge(defaultStyles, variants[variant], className)}
      {...props}
    />
  )
}

export default SelectInput
