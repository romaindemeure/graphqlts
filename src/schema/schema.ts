import { makeExecutableSchema } from 'graphql-tools';

import User from './schemaUsers'

var Endpoints = `
  type Query {
    getUser(first_name: String): User
    getUsers: [User]
  }
`;

var schema = makeExecutableSchema({
  typeDefs: [ Endpoints, User ]
})

export default schema;