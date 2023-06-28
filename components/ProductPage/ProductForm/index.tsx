import React from 'react'
import { FormValues } from '@/components/ProductPage'
import TextInput from '@/components/Atoms/Inputs/TextInput'
import { FormikErrors, FormikTouched } from 'formik/dist/types'
import { fetchImages } from '@/components/ProductPage/ProductForm/methods'
import SelectInput from '@/components/Atoms/Inputs/SelectInput'
import { Option } from '@/components/Atoms/Inputs/inputTypes'

interface Props {
  values: FormValues
  shops: Option[]
  touched: FormikTouched<FormValues>
  errors: FormikErrors<FormValues>
  handleChange(e: React.ChangeEvent<any>): void
  setFieldValue(
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ): void
  setGeneratedImages(images: string[]): void
  handleBlur(e: React.ChangeEvent<any>): void
}

const ProductForm = ({
  values,
  handleChange,
  setFieldValue,
  setGeneratedImages,
  handleBlur,
  touched,
  shops,
  errors,
}: Props) => {
  const fetchImagesOnBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleBlur(e)

    await fetchImages(e, setGeneratedImages)
  }

  return (
    <div className='mt-10 box-border w-1/2 px-10'>
      <TextInput
        id='productName'
        name='productName'
        value={values.productName}
        handleChange={handleChange}
        handleBlur={fetchImagesOnBlur}
        placeholder='Product name'
        error={
          touched.productName && errors.productName ? errors.productName : ''
        }
      />
      <SelectInput
        options={shops}
        id='shopName'
        name='shopName'
        setFieldValue={setFieldValue}
        value={values.shopName}
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
