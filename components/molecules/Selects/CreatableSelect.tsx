import React, { useState } from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import { AutocompleteShops } from '@/components/ShopPage/ShopForm/utils'
import { createSuggestions } from '@/components/molecules/Inputs/utils'
import debounce from 'lodash.debounce'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import {
  AllowedInputNames,
  Option,
} from '@/components/molecules/Inputs/inputTypes'
import TextError from '@/components/Atoms/TextError'
import { selectStyles } from '@/components/Atoms/Select/styles'

interface Props {
  optionFn(inputValue: string): Promise<AutocompleteShops[]>
  setSuggestionImagePreview(inputValue: string): void
  setFieldValue(
    field: AllowedInputNames,
    value: any,
    shouldValidate?: boolean | undefined
  ): void
  value: string
  name: AllowedInputNames
  wrapperClass?: string
  error: string
  placeholder: string
  handleBlur(e: React.ChangeEvent<any>): void
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
      {error && <TextError className='-mt-4'>{error}</TextError>}
    </div>
  )
}

export default CreatableSelectInput
