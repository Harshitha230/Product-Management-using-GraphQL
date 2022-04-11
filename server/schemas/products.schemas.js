"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductArgs = exports.updateProductArgs = exports.createProductArgs = exports.productArgs = exports.productType = void 0;
const graphql_1 = require("graphql");
exports.productType = new graphql_1.GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLFloat },
        quantity: { type: graphql_1.GraphQLFloat }
    })
});
//Arguments
exports.productArgs = {
    id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
};
exports.createProductArgs = {
    //id: {type: new GraphQLNonNull(GraphQLID)},
    name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    price: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
    quantity: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) }
};
exports.updateProductArgs = {
    id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
    name: { type: graphql_1.GraphQLString },
    price: { type: graphql_1.GraphQLFloat },
    quantity: { type: graphql_1.GraphQLFloat }
};
exports.deleteProductArgs = {
    id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
};
