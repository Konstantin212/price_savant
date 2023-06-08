'use client'

import React from 'react'
import ProductPhoto from '@/components/ProductPage/ProductPhoto'
import { useFormik } from 'formik'
import ProductForm from '@/components/ProductPage/ProductForm'
import { productSchema } from '@/lib/schemas/product'
import SubmitButton from '@/components/Atoms/Buttons/SubmitButton'

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

  console.log('isSubmitting')
  console.log(isSubmitting)

  return (
    <form onSubmit={handleSubmit} className='flex w-full flex-wrap justify-end'>
      <ProductPhoto image={values.image} setFieldValue={setFieldValue} />
      <ProductForm
        handleChange={handleChange}
        handleBlur={handleBlur}
        values={values}
        errors={errors}
        touched={touched}
      />
      <SubmitButton isSubmitting={isSubmitting} styles='mr-10' />
    </form>
  )
}

export default ProductPage
