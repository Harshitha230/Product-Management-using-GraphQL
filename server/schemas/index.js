"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const products_schemas_1 = require("./products.schemas");
const user_schemas_1 = require("./user.schemas");
const products_resolvers_1 = require("../resolvers/products.resolvers");
const users_resolvers_1 = require("../resolvers/users.resolvers");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        product: {
            type: products_schemas_1.productType,
            args: products_schemas_1.productArgs,
            resolve: products_resolvers_1.productResolver
        },
        products: {
            type: new graphql_1.GraphQLList(products_schemas_1.productType),
            resolve: products_resolvers_1.productsResolver
        }
    }
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createProduct: {
            type: products_schemas_1.productType,
            args: products_schemas_1.createProductArgs,
            resolve: products_resolvers_1.createProductResolver
        },
        updateProduct: {
            type: products_schemas_1.productType,
            args: products_schemas_1.updateProductArgs,
            resolve: products_resolvers_1.updateProductResolver
        },
        deleteProduct: {
            type: products_schemas_1.productType,
            args: products_schemas_1.deleteProductArgs,
            resolve: products_resolvers_1.deleteProductResolver
        },
        userSignUp: {
            type: user_schemas_1.userType,
            args: user_schemas_1.signUpArgs,
            resolve: users_resolvers_1.signUpResolver
        },
        userLogin: {
            type: user_schemas_1.userLoginType,
            args: user_schemas_1.loginArgs,
            resolve: users_resolvers_1.loginResolver
        }
    }
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
exports.default = schema;
