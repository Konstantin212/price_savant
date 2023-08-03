import React from 'react'
import { InputProps } from '@/components/Atoms/Inputs/inputTypes'

interface INumberInputProps extends InputProps {
  value: string
}
const NumberInput = ({
  handleChange,
  handleBlur,
  value,
  id,
  name,
  error,
  placeholder,
  wrapperClass = '',
}: INumberInputProps) => {
  const numberRegExp = /^\d*\.?\d{0,2}$/
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if (
      !e.target.value ||
      (numberRegExp.test(newValue) && parseFloat(newValue) <= 1000000)
    ) {
      if (handleChange) handleChange(e)
    }
  }

  return (
    <div className={wrapperClass}>
      <input
        id={id}
        className={`group w-full border-b-2 ${
          error ? 'border-red-600' : ' border-primary/30'
        } px-5 py-3 text-sm outline-none transition hover:border-secondary/40 focus:border-secondary [&+label]:focus:-top-4 [&+label]:focus:ml-1 [&+label]:focus:bg-white [&+label]:focus:px-3 [&+label]:focus:text-xs`}
        type='text'
        onChange={handleInputChange}
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

export default NumberInput
