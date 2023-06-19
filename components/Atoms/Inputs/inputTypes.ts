import { AutocompleteShops } from '@/components/ProductPage/ProductForm/methods'
import React from 'react'
export type SelectOption = { value: string; label: string }

export interface InputProps {
  id: string
  wrapperClass?: string
  name: string
  error: string
  placeholder: string
  suggestions?: AutocompleteShops[] | undefined
  handleChange?(
    e: React.ChangeEvent<HTMLInputElement> | SelectOption | null
  ): void
  handleBlur(e: React.ChangeEvent<any>): void
  setSuggestion?(e: React.ChangeEvent<any>): void
}
