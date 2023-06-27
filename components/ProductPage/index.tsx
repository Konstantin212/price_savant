'use client'

import React, { useState } from 'react'
import { useFormik } from 'formik'
import ProductForm from '@/components/ProductPage/ProductForm'
import { productSchema } from '@/lib/schemas/product'
import SubmitButton from '@/components/Atoms/Buttons/SubmitButton'
import { ToastContainer } from 'react-toastify'
import PhotoPreview from '@/components/PhotoPreview'

export interface FormValues {
  image: null | string
  productName: string
  shopName: string
  categoryName: string
}

const onSubmit = async (formValues: FormValues) => {
  console.log('formValues')
  console.log(formValues)
  await new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}
const ProductPage = () => {
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
      productName: '',
      shopName: '',
      categoryName: '',
    } as FormValues,
    onSubmit,
    validationSchema: productSchema,
  })

  return (
    <form onSubmit={handleSubmit} className='flex w-full flex-wrap justify-end'>
      <PhotoPreview
        image={values.image}
        generatedImages={generatedImages}
        setFieldValue={setFieldValue}
      />
      <ProductForm
        setGeneratedImages={setGeneratedImages}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
        handleBlur={handleBlur}
        values={values}
        errors={errors}
        touched={touched}
      />
      <SubmitButton isSubmitting={isSubmitting} styles='mr-10' />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        closeOnClick
        theme='light'
      />
    </form>
  )
}

export default ProductPage
