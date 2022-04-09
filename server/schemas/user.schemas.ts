import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat } from "graphql"

export const userType : any = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      email: {type: GraphQLString},
      password: {type: GraphQLString}
    })
})

export const userLoginType = new GraphQLObjectType({
    name: 'UserLogin',
    fields: ()=>{
      return {
        id: {type: GraphQLID},
        token: {type: GraphQLString}
      }
    }
})

export const signUpArgs = {
    name: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
}

export const loginArgs = {
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
}
