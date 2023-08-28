import React from 'react'
import Button from '@/components/Atoms/Button'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

const SubmitButton = ({ ...props }: Props) => {
  return (
    <Button type='submit' font='lily' variant='primary' size='md' {...props}>
      Submit
    </Button>
  )
}

export default SubmitButton
