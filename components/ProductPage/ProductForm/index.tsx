import React from 'react'
import { FormValues } from '@/components/ProductPage'
import TextInput from '@/components/Atoms/Inputs/TextInput'
import { FormikErrors, FormikTouched } from 'formik/dist/types'
import { fetchImages } from '@/components/ProductPage/ProductForm/methods'
import SelectInput from '@/components/Atoms/Inputs/SelectInput'
import { Option } from '@/components/Atoms/Inputs/inputTypes'
import NumberInput from '@/components/Atoms/Inputs/NumberInput'

interface Props {
  values: FormValues
  shops: Option[]
  categories: Option[]
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
  categories,
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
        id='shopId'
        name='shopId'
        setFieldValue={setFieldValue}
        value={values.shopId}
        handleBlur={handleBlur}
        placeholder='Shop name'
        wrapperClass='mt-3'
        error={touched.shopId && errors.shopId ? errors.shopId : ''}
      />
      <SelectInput
        options={categories}
        id='categoryId'
        name='categoryId'
        value={values.categoryId}
        setFieldValue={setFieldValue}
        handleBlur={handleBlur}
        placeholder='Category name'
        wrapperClass='mt-3'
        error={touched.categoryId && errors.categoryId ? errors.categoryId : ''}
      />
      <NumberInput
        id='price'
        name='price'
        value={values.price}
        handleChange={handleChange}
        handleBlur={handleBlur}
        placeholder='Price'
        error={touched.price && errors.price ? errors.price : ''}
      />
    </div>
  )
}

export default ProductForm
