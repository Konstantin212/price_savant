import React from 'react'
import { FormValues } from '@/components/ProductPage'
import TextInput from '@/components/Atoms/Inputs/TextInput'
import { FormikErrors, FormikTouched } from 'formik/dist/types'

interface Props {
  values: FormValues
  touched: FormikTouched<FormValues>
  errors: FormikErrors<FormValues>
  handleChange(e: React.ChangeEvent<any>): void
  handleBlur(e: React.ChangeEvent<any>): void
}

const ProductForm = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}: Props) => {
  return (
    <div className='mt-10 box-border w-1/2 px-10'>
      <TextInput
        id='productName'
        name='productName'
        value={values.productName}
        handleChange={handleChange}
        handleBlur={handleBlur}
        placeholder='Product name'
        error={
          touched.productName && errors.productName ? errors.productName : ''
        }
      />
      <TextInput
        id='shopName'
        name='shopName'
        value={values.shopName}
        handleChange={handleChange}
        handleBlur={handleBlur}
        placeholder='Shop name'
        wrapperClass='mt-3'
        error={touched.shopName && errors.shopName ? errors.shopName : ''}
      />
      <TextInput
        id='categoryName'
        name='categoryName'
        value={values.categoryName}
        handleChange={handleChange}
        handleBlur={handleBlur}
        placeholder='Category name'
        wrapperClass='mt-3'
        error={
          touched.categoryName && errors.categoryName ? errors.categoryName : ''
        }
      />
    </div>
  )
}

export default ProductForm
