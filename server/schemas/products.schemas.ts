import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat } from "graphql";

export const productType : any = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    price: {type: GraphQLFloat},
    quantity: {type: GraphQLFloat}
  })
})

//Arguments
export const productArgs = {
  id: {type: new GraphQLNonNull(GraphQLID)}
}

export const createProductArgs = {
  //id: {type: new GraphQLNonNull(GraphQLID)},
  name: {type: new GraphQLNonNull(GraphQLString)},
  price: {type: new GraphQLNonNull(GraphQLFloat)},
  quantity: {type: new GraphQLNonNull(GraphQLFloat)}
}

export const updateProductArgs = {
  id: {type: new GraphQLNonNull(GraphQLID)},
  name: {type: GraphQLString},
  price: {type: GraphQLFloat},
  quantity: {type: GraphQLFloat}
}

export const deleteProductArgs = {
  id: {type: new GraphQLNonNull(GraphQLID)}
}