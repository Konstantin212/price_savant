import React, { ChangeEvent } from 'react'

export type ImageBuffer = string | ArrayBuffer | null | undefined

interface PhotoUploaderProps {
  onUpload(image: ImageBuffer): void
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onUpload }) => {
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        onUpload(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='group mx-auto mt-2 flex h-[300px] w-[300px] items-center justify-center rounded-lg border border-dashed  border-gray-900/25 transition hover:border-secondary'>
      <div className='border-red- text-center'>
        <svg
          className='mx-auto h-12 w-12 text-gray-300 transition group-hover:text-secondary'
          viewBox='0 0 24 24'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
            clipRule='evenodd'
          />
        </svg>
        <div className='mt-4 flex justify-center text-sm leading-6 text-gray-600'>
          <label
            htmlFor='image'
            className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
          >
            <span>Upload a file</span>
            <input
              id='image'
              name='image'
              type='file'
              className='sr-only'
              accept='images/*'
              onChange={handlePhotoUpload}
            />
          </label>
          <p className='pl-1'>or drag and drop</p>
        </div>
        <p className='text-xs leading-5 text-gray-600'>
          PNG, JPG, GIF up to 10MB
        </p>
        <p className='mt-5 text-sm font-semibold leading-5 text-gray-600 text-indigo-600'>
          Or you can select an image from suggested after entering product name
        </p>
      </div>
    </div>
  )
}

export default PhotoUploader
