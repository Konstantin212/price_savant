'use client'

import React, { useState } from 'react'
import { useFormik } from 'formik'
import ProductForm from '@/components/ProductPage/ProductForm'
import { productSchema } from '@/lib/schemas/product'
import SubmitButton from '@/components/Atoms/Buttons/SubmitButton'
import { ToastContainer } from 'react-toastify'
import PhotoPreview from '@/components/PhotoPreview'
import { Option } from '@/components/Atoms/Inputs/inputTypes'
import { _post } from '@/lib/api/utils'
import { handleResponse } from '@/lib/api/helpers'

interface PageProps {
  shops: Option[]
  categories: Option[]
}

export interface FormValues {
  image: null | string
  productName: string
  shopId: string
  categoryId: string
  price: string
}

const onSubmit = async (formValues: FormValues) => {
  const resp = await _post('/api/products', {
    body: JSON.stringify(formValues),
  })

  await handleResponse(resp)
}
const ProductPage: React.FC<PageProps> = ({ shops, categories }) => {
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
      shopId: '',
      categoryId: '',
      price: '',
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
        shops={shops}
        categories={categories}
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
