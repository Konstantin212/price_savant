import React from 'react'
import { InputProps } from '@/components/Atoms/Inputs/inputTypes'

interface TextInputProps extends InputProps {
  value: string
}

const TextInput = ({
  handleChange,
  handleBlur,
  value,
  id,
  name,
  error,
  placeholder,
  wrapperClass = '',
}: TextInputProps) => {
  return (
    <div className={wrapperClass}>
      <input
        id={id}
        className={`group w-full border-b-2 ${
          error ? 'border-red-600' : ' border-primary/30'
        } px-5 py-3 text-sm outline-none transition hover:border-secondary/40 focus:border-secondary [&+label]:focus:-top-4 [&+label]:focus:ml-1 [&+label]:focus:bg-white [&+label]:focus:px-3 [&+label]:focus:text-xs`}
        type='text'
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        value={value}
      />
      <label
        htmlFor={id}
        className={`relative ml-2 cursor-text text-primary/50 transition-all ${
          value ? '-top-4 ml-1 bg-white px-3 text-xs' : '-top-9  text-sm'
        }`}
      >
        {value ? placeholder : 'Enter ' + placeholder}
      </label>
      {error && <p className='-mt-4 text-xs text-red-600'>{error}</p>}
    </div>
  )
}

export default TextInput
