import React from 'react'
import { InputProps, SelectOption } from '@/components/Atoms/Inputs/inputTypes'
import Select from 'react-select'
import { CSSObjectWithLabel } from 'react-select/dist/declarations/src/types'

interface SelectInputProps extends InputProps {
  options: SelectOption[]
  value: string
  setFieldValue(
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ): void
}

const selectStyles = {
  control: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    borderColor: 'initial',
    boxShadow: 'none',
    outline: 'none',
    border: 'none',
  }),
  placeholder: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    color: 'rgb(5 23 38 / 0.5)',
  }),
}

const SelectInput = ({
  wrapperClass,
  setFieldValue,
  options,
  error,
  id,
  name,
  handleBlur,
  placeholder,
  value,
}: SelectInputProps) => {
  const handleSelectChange = (item: SelectOption | null) => {
    setFieldValue(name, item?.value)
  }

  return (
    <div className={wrapperClass}>
      <Select
        id={id}
        name={name}
        options={options}
        onChange={handleSelectChange}
        onBlur={handleBlur}
        placeholder={value ? placeholder : 'Enter ' + placeholder}
        styles={selectStyles}
        className={`${
          error ? 'border-red-600' : ' border-primary/30'
        } w-full border-b-2 text-sm  outline-none transition hover:border-secondary/40 focus:border-secondary`}
      />
      <p
        className={`mt-2 text-xs text-red-600 ${
          error ? 'opacity-100' : 'h-4 opacity-0'
        }`}
      >
        {error}
      </p>
    </div>
  )
}

export default SelectInput
