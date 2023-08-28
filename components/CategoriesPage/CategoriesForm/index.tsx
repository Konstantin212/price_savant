import React from 'react'
import { FormikErrors, FormikTouched } from 'formik/dist/types'
import { FormValues } from '@/components/CategoriesPage'
import TextInput from '@/components/molecules/Inputs/TextInput'
import { fetchImages } from '@/components/ProductPage/ProductForm/methods'

interface Props {
  values: FormValues
  touched: FormikTouched<FormValues>
  errors: FormikErrors<FormValues>
  handleChange(e: React.ChangeEvent<any>): void
  handleBlur(e: React.ChangeEvent<any>): void
  setGeneratedImages(images: string[]): void
}

const CategoryForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setGeneratedImages,
}: Props) => {
  const fetchImagesOnBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleBlur(e)

    await fetchImages(e, setGeneratedImages)
  }

  return (
    <div className='mt-10 box-border w-1/2 px-10'>
      <TextInput
        id='categoryName'
        name='categoryName'
        value={values.categoryName}
        onChange={handleChange}
        onBlur={fetchImagesOnBlur}
        placeholder='Category name'
        error={
          touched.categoryName && errors.categoryName ? errors.categoryName : ''
        }
      />
    </div>
  )
}

export default CategoryForm
