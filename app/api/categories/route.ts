import { IDBRequestResult } from '@/lib/api/types'
import { apiRouteHandler } from '@/lib/api/apiRouteHandler'
import { CategoriesBase } from '@/lib/db/categories'
import { handleError } from '@/lib/api/utils'

const categoriesBase = new CategoriesBase()

export async function GET() {
  const dbRequestFunction = async (): Promise<IDBRequestResult> => {
    try {
      const data = await categoriesBase.getAllCategories()

      return { result: data }
    } catch (e) {
      return handleError(e)
    }
  }

  return await apiRouteHandler({
    dbRequestFunction,
    requestType: 'post',
  })
}
export async function POST(req: Request) {
  const dbRequestFunction = async (): Promise<IDBRequestResult> => {
    const { image, categoryName } = await req.json()

    const { result, error } = await categoriesBase.createCategory({
      image,
      name: categoryName,
    })

    if (error) {
      return { error }
    }

    return { result, target: categoryName }
  }

  return await apiRouteHandler({
    dbRequestFunction,
    requestType: 'post',
  })
}
