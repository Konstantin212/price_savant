import React from 'react'
import Image from 'next/image'

interface Props {
  generatedImages: string[] | string
  setPreviewImage(e: string | null): void
  setFieldValue(
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ): void
}

const GeneratedPhoto = ({
  generatedImages,
  setPreviewImage,
  setFieldValue,
}: Props) => {
  const handlePreviewImage = (photo: string) => () => {
    setFieldValue('image', photo)
    setPreviewImage(photo)
  }

  if (!Array.isArray(generatedImages)) return null

  return (
    <div className='col-span-12 flex justify-between'>
      {generatedImages.map((photo) => (
        <button type='button' key={photo} onClick={handlePreviewImage(photo)}>
          <Image
            src={photo}
            alt='product'
            width={100}
            height={50}
            className='h-20 w-36 cursor-pointer rounded border-2 object-cover p-3 shadow-lg transition-all hover:border-secondary hover:p-0'
          />
        </button>
      ))}
    </div>
  )
}

export default GeneratedPhoto
