'use client'

import React, { useState } from 'react'
import ProductPhoto from '@/components/ProductPage/ProductPhoto'
import { useFormik } from 'formik'
import { shopSchema } from '@/lib/schemas/product'
import SubmitButton from '@/components/Atoms/Buttons/SubmitButton'
import { ToastContainer } from 'react-toastify'
import ShopForm from '@/components/ShopPage/ShopForm'

export interface FormValues {
  image: null | string
  shopName: string
}

const onSubmit = async (formValues: FormValues) => {
  console.log('formValues')
  console.log(formValues)
  await new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}
const ShopPage = () => {
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
      shopName: '',
    } as FormValues,
    onSubmit,
    validationSchema: shopSchema,
  })

  return (
    <form onSubmit={handleSubmit} className='flex w-full flex-wrap justify-end'>
      <ProductPhoto
        image={values.image}
        generatedImages={generatedImages}
        setFieldValue={setFieldValue}
      />
      <ShopForm
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

export default ShopPage
