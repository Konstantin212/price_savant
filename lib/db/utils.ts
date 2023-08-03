export const handleError = (err: Error | unknown) => {
  console.error(err)
  if (err instanceof Error) {
    return { data: null, error: err.message }
  }

  throw new Error(err as string)
}
