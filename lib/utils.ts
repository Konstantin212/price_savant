import ms from 'ms'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never'
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? '' : ' ago'
  }`
}

export const isUrl = (image: string): boolean => {
  const urlPattern = /^https?:\/\/.*/ // Regular expression pattern for URLs
  return urlPattern.test(image)
}

export function clsxMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
