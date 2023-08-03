import * as yup from 'yup'
export const productSchema = yup.object().shape({
  productName: yup
    .string()
    .max(15, 'Product name is too long, it should be max 15 characters')
    .required('Product name is required field'),
  shopId: yup
    .string()
    .max(15, 'Shop name is too long, it should be max 15 characters')
    .required('Shop name is required field'),
  categoryId: yup
    .string()
    .max(15, 'Category name is too long, it should be max 15 characters')
    .required('Category name is required field'),
  price: yup
    .string()
    .max(9, 'Price should be less than 1m')
    .required('Price is required field'),
})

export const shopSchema = yup.object().shape({
  shopName: yup
    .string()
    .max(15, 'Shop name is too long, it should be max 15 characters')
    .required('Shop name is required field'),
})

export const categorySchema = yup.object().shape({
  categoryName: yup
    .string()
    .max(15, 'Category name is too long, it should be max 15 characters')
    .required('Category name is required field'),
})
