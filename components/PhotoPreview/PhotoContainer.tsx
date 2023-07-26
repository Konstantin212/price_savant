import React from 'react'
import { ImageBuffer } from '@/components/PhotoPreview/PhotoUploader'

interface Props {
  src: ImageBuffer
  handleDelete(event: React.SyntheticEvent): void
}

const PhotoContainer = ({ src, handleDelete }: Props) => (
  <div className='group relative mt-2'>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={src as string}
      alt=''
      className='mx-auto h-[300px] w-[300px] rounded-lg object-cover shadow-lg'
    />
    <div className='z-1 absolute inset-24 mx-auto flex w-[150px] flex-nowrap overflow-hidden rounded bg-primary/70 text-white opacity-0 transition group-hover:opacity-100'>
      <button
        onClick={handleDelete}
        type='button'
        className='w-full transition hover:bg-secondary-dark'
      >
        Delete
      </button>
    </div>
  </div>
)

export default PhotoContainer
