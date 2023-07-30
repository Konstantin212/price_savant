import { IDBRequestResult } from '@/lib/api/types'
import { apiRouteHandler } from '@/lib/api/apiRouteHandler'
import { CategoriesBase } from '@/lib/db/categories'

export async function POST(req: Request) {
  const dbRequestFunction = async (): Promise<IDBRequestResult> => {
    const categoriesBase = new CategoriesBase()
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
