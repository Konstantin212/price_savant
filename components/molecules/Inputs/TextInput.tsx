import React from 'react'
import Input from '@/components/Atoms/Inputs'
import { clsxMerge } from '@/lib/utils'
import Label from '@/components/Atoms/Label'
import TextError from '@/components/Atoms/TextError'

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error: string
  wrapperClass?: string
}

const TextInput = ({
  onChange,
  onBlur,
  value,
  id,
  name,
  error,
  placeholder,
  wrapperClass = '',
}: TextInputProps) => {
  return (
    <div className={wrapperClass}>
      <Input
        name={name}
        id={id}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className={clsxMerge(
          '[&+label]:focus:-top-4 [&+label]:focus:ml-1 [&+label]:focus:bg-white [&+label]:focus:px-3 [&+label]:focus:text-xs',
          error && 'border-red-600'
        )}
      />
      <Label
        htmlFor={id}
        className={clsxMerge(
          value ? '-top-4 ml-1 bg-white px-3 text-xs' : '-top-9 ml-2 '
        )}
      >
        {value ? placeholder : 'Enter ' + placeholder}
      </Label>
      {error && <TextError className='-mt-4'>{error}</TextError>}
    </div>
  )
}

export default TextInput
