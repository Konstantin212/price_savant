export type DBRequestError = { data: null; error: string }

export const handleError = (err: Error | unknown): DBRequestError => {
  console.error(err)
  if (err instanceof Error) {
    return { data: null, error: err.message }
  }

  return { error: err as string, data: null }
}
