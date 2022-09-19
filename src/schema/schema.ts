import { makeExecutableSchema } from 'graphql-tools';

import User from './schemaUsers'

var Endpoints = `
  type Query {
    getUserByEmail(email: String): User
    getUsers: [User]
  }
`;

var schema = makeExecutableSchema({
  typeDefs: [ Endpoints, User ]
})

export default schema;