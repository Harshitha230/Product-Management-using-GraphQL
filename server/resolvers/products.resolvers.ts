import { Product } from '../models/products.models'

//Retrieve all products stored in the database
export const productsResolver = (parent: any, args: any) => {
  return Product.find({})
}

//Retrieve the deatils of a particular product found by its ID
export const productResolver = (parent: any, args: any) => {
  return Product.findById(args.id)
}

//Create a new product
export const createProductResolver = (parent: any, args: any) => {
  const newProduct = new Product({
    name: args.name,
    price: args.price,
    quantity: args.quantity,
  })
  return newProduct.save()
}

//Update an existing product
export const updateProductResolver = (parent: any, args: any) => {
  try {
    if (!args.id) {
      console.log('Product does not exist')
    }
    return Product.findOneAndUpdate(
      {
        _id: args.id,
      },
      {
        $set: {
          name: args.name,
          price: args.price,
          quantity: args.quantity,
        },
      }
    )
  } catch (error: any) {
    return error
  }
}

//Delete an existing product
export const deleteProductResolver = (parent: any, args: any) => {
  try {
    if (!args.id) {
      console.log('Product does not exist')
    }
    return Product.findByIdAndDelete(args.id)
  } catch (error: any) {
    return error
  }
}
