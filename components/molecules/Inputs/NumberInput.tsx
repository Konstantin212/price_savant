import React from 'react'
import Input from '@/components/Atoms/Inputs'
import { clsxMerge } from '@/lib/utils'
import Label from '@/components/Atoms/Label'
import TextError from '@/components/Atoms/TextError'

type NumberInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error: string
  wrapperClass?: string
}
const NumberInput = ({
  onChange,
  onBlur,
  value,
  id,
  name,
  error,
  placeholder,
  wrapperClass = '',
}: NumberInputProps) => {
  const numberRegExp = /^\d*\.?\d{0,2}$/
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if (
      !e.target.value ||
      (numberRegExp.test(newValue) && parseFloat(newValue) <= 1000000)
    ) {
      if (onChange) onChange(e)
    }
  }

  return (
    <div className={wrapperClass}>
      <Input
        id={id}
        className={clsxMerge(
          error && 'border-red-600',
          '[&+label]:focus:-top-4 [&+label]:focus:ml-1 [&+label]:focus:bg-white [&+label]:focus:px-3 [&+label]:focus:text-xs'
        )}
        onChange={handleInputChange}
        onBlur={onBlur}
        name={name}
        value={value}
      />
      <Label
        htmlFor={id}
        className={clsxMerge(
          'ml-2',
          value ? '-top-4 ml-1 bg-white px-3 text-xs' : '-top-9  text-sm'
        )}
      >
        {value ? placeholder : 'Enter ' + placeholder}
      </Label>

      {error && <TextError className='-mt-4'>{error}</TextError>}
    </div>
  )
}

export default NumberInput
