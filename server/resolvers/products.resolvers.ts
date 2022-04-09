import { Product} from "../models/products.models";

export const productsResolver = (parent: any, args: any) => {
    return Product.find({})
}

export const productResolver = (parent: any, args: any) => {
    return Product.findById(args.id)
}

export const createProductResolver = (parent: any, args: any) => {
    const newProduct = new Product({
        name: args.name,
        price: args.price,
        quantity: args.quantity
    })
    return newProduct.save()
}

export const updateProductResolver = (parent: any, args: any) => {
    try{
        if(!args.id){
            console.log('Product does not exist')
        }
        return Product.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    name: args.name,
                    price: args.price,
                    quantity: args.quantity
                }
            }
        )
    }
    catch(error){
        return error
    }
}
        
export const deleteProductResolver = (parent: any, args: any) => {
    try{
        if(!args.id){
            console.log('Product does not exist')
        }
        return Product.findByIdAndDelete(args.id)
        console.log('Product deleted')
    }
    catch(error){
        return error
    }
} 
