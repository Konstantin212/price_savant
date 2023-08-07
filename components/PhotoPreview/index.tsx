'use client'

import React, { useEffect, useState } from 'react'
import GeneratedPhoto from '@/components/PhotoPreview/GeneratedPhoto'
import PhotoContainer from '@/components/PhotoPreview/PhotoContainer'
import PhotoUploader, {
  ImageBuffer,
} from '@/components/PhotoPreview/PhotoUploader'

interface Props {
  image: null | string
  generatedImages?: string[]
  setFieldValue(
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ): void
}

const PhotoPreview = ({ image, setFieldValue, generatedImages }: Props) => {
  const showGeneratedImagesPreview = Array.isArray(generatedImages)

  const [previewImage, setPreviewImage] = useState<ImageBuffer>(image)

  useEffect(() => {
    setPreviewImage(image)
  }, [image])

  const handleDelete = () => {
    setPreviewImage(null)
    setFieldValue('image', null)
  }

  const handleUpload = (image: ImageBuffer) => {
    setPreviewImage(image)
    setFieldValue('image', image)
  }

  return (
    <div className='mt-10 grid w-1/2 grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
      <div className='col-span-12'>
        {previewImage ? (
          <PhotoContainer src={previewImage} handleDelete={handleDelete} />
        ) : (
          <PhotoUploader onUpload={handleUpload} />
        )}
      </div>
      {showGeneratedImagesPreview && (
        <GeneratedPhoto
          generatedImages={generatedImages}
          setPreviewImage={setPreviewImage}
          setFieldValue={setFieldValue}
        />
      )}
    </div>
  )
}

export default PhotoPreview
