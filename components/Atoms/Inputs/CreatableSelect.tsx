import React, { useState } from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import { AutocompleteShops } from '@/components/ShopPage/ShopForm/utils'
import { createSuggestions } from '@/components/Atoms/Inputs/utils'
import debounce from 'lodash.debounce'
import { CSSObjectWithLabel } from 'react-select/dist/declarations/src/types'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { FormFields } from '@/components/ShopPage'

export interface Option {
  readonly label: string
  readonly value: string
  readonly icon?: string
}

interface Props {
  optionFn(inputValue: string): Promise<AutocompleteShops[]>
  setSuggestionImagePreview(inputValue: string): void
  setFieldValue(
    field: FormFields,
    value: any,
    shouldValidate?: boolean | undefined
  ): void
  value: string
  name: FormFields
  wrapperClass?: string
  error: string
  placeholder: string
  handleBlur(e: React.ChangeEvent<any>): void
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
  indicatorsContainer: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    display: 'none',
  }),
}

const CustomOption = ({ innerProps, label, data }: any) => (
  <div
    {...innerProps}
    className='flex cursor-pointer items-center px-3 py-1 hover:bg-secondary/20'
  >
    {data.icon ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={data.icon} alt={data.label} className='mr-5 h-6 w-6' />
    ) : (
      <PlusCircleIcon className='mr-5 h-6 w-6 text-primary' />
    )}
    <span>{label}</span>
  </div>
)

const CreatableSelectInput = ({
  optionFn,
  wrapperClass,
  error,
  handleBlur,
  setFieldValue,
  name,
  setSuggestionImagePreview,
  value = '',
  placeholder = '',
}: Props) => {
  const [newValue, setNewValue] = useState<null | {
    label: string
    value: string
  }>(null)

  const _loadOptions = (inputValue: string, callback: any) => {
    new Promise((resolve) => {
      resolve(createSuggestions(inputValue, optionFn))
    }).then((options) => callback(options))
  }

  const handleCreateOption = (inputValue: string) => {
    const value: Option = { label: inputValue, value: inputValue }
    setNewValue(value)
  }

  const loadOptions = debounce(_loadOptions, 300)

  const handleSelectChange = (value: Option | null) => {
    if (!value) return null

    setFieldValue(name, value.label)
    setNewValue(value)

    if (value.icon) {
      setSuggestionImagePreview(value.icon)
      setFieldValue('image', value.icon)
    }
  }

  return (
    <div className={wrapperClass}>
      <AsyncCreatableSelect
        onBlur={handleBlur}
        styles={selectStyles}
        className={`${
          error ? 'border-red-600' : ' border-primary/30'
        } w-full border-b-2 text-sm  outline-none transition hover:border-secondary/40 focus:border-secondary`}
        defaultOptions
        placeholder={value ? placeholder : 'Enter ' + placeholder}
        loadOptions={loadOptions}
        onCreateOption={handleCreateOption}
        value={newValue}
        onChange={handleSelectChange}
        components={{ Option: CustomOption }}
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

export default CreatableSelectInput
