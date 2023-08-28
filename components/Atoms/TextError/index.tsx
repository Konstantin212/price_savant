import React from 'react'
import { clsxMerge } from '@/lib/utils'

const TextError = ({
  children,
  className,
}: React.HTMLProps<HTMLParagraphElement>) => {
  return (
    <p className={clsxMerge('text-xs text-red-600', className)}>{children}</p>
  )
}

export default TextError
