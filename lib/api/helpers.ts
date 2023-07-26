import { toast } from 'react-toastify'

export const handleResponse = async (response: Response): Promise<void> => {
  const data = await response.json()

  if (data.error) {
    toast.error(data.error)
    return
  }

  toast.success(data.msg)
}
