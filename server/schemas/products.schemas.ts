import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt,
} from 'graphql'

export const productType: any = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
  }),
})

//Arguments
export const productArgs = {
  id: { type: new GraphQLNonNull(GraphQLID) },
}

export const createProductArgs = {
  name: { type: new GraphQLNonNull(GraphQLString) },
  price: { type: new GraphQLNonNull(GraphQLFloat) },
  quantity: { type: new GraphQLNonNull(GraphQLInt) },
}

export const updateProductArgs = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  name: { type: GraphQLString },
  price: { type: GraphQLFloat },
  quantity: { type: GraphQLInt },
}

export const deleteProductArgs = {
  id: { type: new GraphQLNonNull(GraphQLID) },
}
