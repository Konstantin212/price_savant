'use client'

import React, { useState } from 'react'
import { useFormik } from 'formik'
import ProductForm from '@/components/ProductPage/ProductForm'
import { productSchema } from '@/lib/schemas/product'
import { ToastContainer } from 'react-toastify'
import PhotoPreview from '@/components/PhotoPreview'
import { Option } from '@/components/molecules/Inputs/inputTypes'
import { _post, _put } from '@/lib/api/utils'
import { handleResponse } from '@/lib/api/helpers'
import { IProductWithPrice } from '@/app/types'
import SubmitButton from '@/components/molecules/Buttons/SubmitButton'

interface PageProps {
  shops: Option[]
  categories: Option[]
  data?: IProductWithPrice | null
  isEdit: boolean
}

export interface FormValues {
  id?: number
  image: null | string
  productName: string
  shopId: string
  categoryId: string
  price: string
}

const onSubmit = async (formValues: FormValues) => {
  let resp

  if (formValues.id) {
    resp = await _put(`/api/products/${formValues.id}`, {
      body: JSON.stringify(formValues),
    })
  } else {
    resp = await _post('/api/products', {
      body: JSON.stringify(formValues),
    })
  }

  await handleResponse(resp)
}

const defaultValues = {
  image: null,
  productName: '',
  shopId: '',
  categoryId: '',
  price: '',
}

const ProductPage: React.FC<PageProps> = ({
  shops,
  categories,
  data,
  isEdit,
}) => {
  const [generatedImages, setGeneratedImages] = useState<string[]>([])

  const initialValues = (data || defaultValues) as FormValues

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
    initialValues,
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
        isEdit={isEdit}
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

export default ProductPage
