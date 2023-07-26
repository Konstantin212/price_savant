import React from 'react'

interface Props {
  styles?: string
  isSubmitting: boolean
}

const SubmitButton = ({ styles = '', isSubmitting }: Props) => {
  return (
    <button
      disabled={isSubmitting}
      type='submit'
      className={`rounded bg-primary px-6 py-2 font-lily text-xl text-white transition hover:bg-secondary hover:text-primary disabled:bg-primary/20 disabled:text-primary ${styles}`}
    >
      Save
    </button>
  )
}

export default SubmitButton
