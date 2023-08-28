import React, { useMemo } from 'react'
import { SelectOption } from '@/components/Atoms/Select/types'
import Select from '@/components/Atoms/Select'
import TextError from '@/components/Atoms/TextError'
import { Props as SelectProps } from 'react-select'

type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  SelectProps & {
    options: SelectOption[]
    wrapperClass?: string
    error: string
    setFieldValue(
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ): void
  }

const SelectInput = ({
  wrapperClass,
  setFieldValue,
  options,
  error,
  id,
  name,
  onBlur,
  placeholder,
  value,
}: SelectInputProps) => {
  const defaultValue = useMemo(
    () => options.find((o: SelectOption) => o.value === value),
    [options, value]
  )
  const handleSelectChange = (item: unknown) => {
    setFieldValue(name || 'default', (item as SelectOption)?.value)
  }

  return (
    <div className={wrapperClass}>
      <Select
        id={id}
        name={name}
        options={options}
        onChange={handleSelectChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
        placeholder={value ? placeholder : 'Enter ' + placeholder}
        className={error && 'border-red-600'}
      />
      {error && <TextError className='-mt-4'>{error}</TextError>}
    </div>
  )
}

export default SelectInput
