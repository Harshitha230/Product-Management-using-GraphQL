"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginArgs = exports.signUpArgs = exports.userLoginType = exports.userType = void 0;
const graphql_1 = require("graphql");
exports.userType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    })
});
exports.userLoginType = new graphql_1.GraphQLObjectType({
    name: 'UserLogin',
    fields: () => {
        return {
            id: { type: graphql_1.GraphQLID },
            token: { type: graphql_1.GraphQLString }
        };
    }
});
exports.signUpArgs = {
    name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
};
exports.loginArgs = {
    email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
};
