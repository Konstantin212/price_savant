import React from 'react'

export type SelectOption = { value: string; label: string }

export interface InputProps {
  id: string
  wrapperClass?: string
  name: string
  error: string
  placeholder: string
  handleChange?(
    e: React.ChangeEvent<HTMLInputElement> | SelectOption | null
  ): void
  handleBlur(e: React.ChangeEvent<any>): void
}

export interface Option {
  readonly label: string
  readonly value: string | number
  readonly icon?: string
}
