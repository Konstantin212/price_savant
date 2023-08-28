import React from 'react'
import { FormikErrors, FormikTouched } from 'formik/dist/types'
import { FormFields, FormValues } from '@/components/ShopPage'
import { fetchShopNameSuggestions } from '@/components/ShopPage/ShopForm/utils'
import CreatableSelectInput from '@/components/molecules/Selects/CreatableSelect'

interface Props {
  values: FormValues
  touched: FormikTouched<FormValues>
  errors: FormikErrors<FormValues>
  handleChange(e: React.ChangeEvent<any>): void
  setFieldValue(
    field: FormFields,
    value: any,
    shouldValidate?: boolean | undefined
  ): void
  setSuggestionImagePreview(image: string): void
  handleBlur(e: React.ChangeEvent<any>): void
}

const ShopForm = ({
  values,
  errors,
  touched,
  setFieldValue,
  handleBlur,
  setSuggestionImagePreview,
}: Props) => {
  return (
    <div className='mt-10 box-border w-1/2 px-10'>
      <CreatableSelectInput
        setSuggestionImagePreview={setSuggestionImagePreview}
        placeholder='Shop name'
        name='shopName'
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        error={touched.shopName && errors.shopName ? errors.shopName : ''}
        optionFn={fetchShopNameSuggestions}
        value={values.shopName}
      />
    </div>
  )
}

export default ShopForm
