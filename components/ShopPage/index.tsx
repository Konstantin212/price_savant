'use client'

import React, { useState } from 'react'
import { useFormik } from 'formik'
import { shopSchema } from '@/lib/schemas/product'
import SubmitButton from '@/components/Atoms/Buttons/SubmitButton'
import { ToastContainer } from 'react-toastify'
import ShopForm from '@/components/ShopPage/ShopForm'
import PhotoPreview from '@/components/PhotoPreview'
import { _post } from '@/lib/api/utils'
import { handleResponse } from '@/lib/api/helpers'

export interface FormValues {
  image: null | string
  shopName: string
}

export type FormFields = keyof FormValues

const onSubmit = async (formValues: FormValues) => {
  const resp = await _post('/api/shops', { body: JSON.stringify(formValues) })

  await handleResponse(resp)
}
const ShopPage = () => {
  const [suggestionImagePreview, setSuggestionImagePreview] = useState<
    string | null
  >(null)

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
      <PhotoPreview
        image={values.image}
        imagePreview={suggestionImagePreview}
        setFieldValue={setFieldValue}
      />
      <ShopForm
        setSuggestionImagePreview={setSuggestionImagePreview}
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
