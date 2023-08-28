'use client'

import React, { useState } from 'react'
import { useFormik } from 'formik'
import { categorySchema } from '@/lib/schemas/product'
import { ToastContainer } from 'react-toastify'
import PhotoPreview from '@/components/PhotoPreview'
import { _post } from '@/lib/api/utils'
import { handleResponse } from '@/lib/api/helpers'
import CategoryForm from '@/components/CategoriesPage/CategoriesForm'
import SubmitButton from '@/components/molecules/Buttons/SubmitButton'

export interface FormValues {
  image: null | string
  categoryName: string
}

export type FormFields = keyof FormValues

const onSubmit = async (formValues: FormValues) => {
  console.log('data')
  const resp = await _post('/api/categories', {
    body: JSON.stringify(formValues),
  })

  console.log('resp')
  console.log(resp)

  await handleResponse(resp)
}
const CategoriesPage = () => {
  const [generatedImages, setGeneratedImages] = useState<string[]>([])

  const {
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      image: null,
      categoryName: '',
    } as FormValues,
    onSubmit,
    validationSchema: categorySchema,
  })

  return (
    <form onSubmit={handleSubmit} className='flex w-full flex-wrap justify-end'>
      <PhotoPreview
        image={values.image}
        generatedImages={generatedImages}
        setFieldValue={setFieldValue}
      />
      <CategoryForm
        handleChange={handleChange}
        handleBlur={handleBlur}
        values={values}
        errors={errors}
        touched={touched}
        setGeneratedImages={setGeneratedImages}
      />
      <SubmitButton disabled={isSubmitting} className='mr-10' />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        closeOnClick
        theme='light'
      />
    </form>
  )
}

export default CategoriesPage
