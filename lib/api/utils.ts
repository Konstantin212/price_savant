type CallParams = RequestInit | undefined

const requestUrl = (url: string): string =>
  `http://${process.env.NEXT_PUBLIC_API_HOST_LOCAL}${url}`

export const _get = async (url: string, params?: CallParams): Promise<any> => {
  return await handleRequest(url, {
    method: 'GET',
    ...params,
  })
}
export const _post = async (url: string, params?: CallParams): Promise<any> => {
  return await handleRequest(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params?.body),
    ...params,
  })
}
export const _put = async (url: string, params?: CallParams): Promise<any> => {
  return await handleRequest(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params?.body),
    ...params,
  })
}
export const _delete = async (
  url: string,
  params?: CallParams
): Promise<any> => {
  return await handleRequest(url, {
    method: 'DELETE',
    ...params,
  })
}

const handleRequest = (url: string, params: CallParams) => {
  try {
    return fetch(requestUrl(url), params)
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
}

export const handleError = (error: Error | unknown): { error: string } => {
  if (error instanceof Error) {
    console.error(error)
    return { error: error.message }
  }

  return { error: error as string }
}
