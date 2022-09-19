import { makeExecutableSchema } from 'graphql-tools';

import User from './schemaUsers'

// GraphQL creation of schema for my endpoint API
var Endpoints = `
  type Query {
    getUserByEmail(email: String): User
    getUsers: [User]
  }
`;

// Add Another schema in my endpoints for sort my file
var schema = makeExecutableSchema({
  typeDefs: [ Endpoints, User ]
})

export default schema;