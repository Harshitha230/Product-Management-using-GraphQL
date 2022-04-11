import { GraphQLObjectType, GraphQLSchema, GraphQLList } from 'graphql'
import {
  productType,
  productArgs,
  createProductArgs,
  updateProductArgs,
  deleteProductArgs,
} from './products.schemas'
import { userType, userLoginType, signUpArgs, loginArgs } from './user.schemas'
import {
  productResolver,
  productsResolver,
  createProductResolver,
  updateProductResolver,
  deleteProductResolver,
} from '../resolvers/products.resolvers'
import { signUpResolver, loginResolver } from '../resolvers/users.resolvers'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: {
      type: productType,
      args: productArgs,
      resolve: productResolver,
    },
    products: {
      type: new GraphQLList(productType),
      resolve: productsResolver,
    },
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createProduct: {
      type: productType,
      args: createProductArgs,
      resolve: createProductResolver,
    },

    updateProduct: {
      type: productType,
      args: updateProductArgs,
      resolve: updateProductResolver,
    },

    deleteProduct: {
      type: productType,
      args: deleteProductArgs,
      resolve: deleteProductResolver,
    },

    userSignUp: {
      type: userType,
      args: signUpArgs,
      resolve: signUpResolver,
    },

    userLogin: {
      type: userLoginType,
      args: loginArgs,
      resolve: loginResolver,
    },
  },
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})

export default schema
