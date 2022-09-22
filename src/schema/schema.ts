import { makeExecutableSchema } from 'graphql-tools';

import User from './schemaUsers'

// GraphQL creation of schema for my endpoint API
var Endpoints = `
  type Query {
    getUserById(id: String): User
    getUserByEmail(email: String): User
    getUsers: [User]
  }

  type Mutation {
    createUser(input: UserInput): User
    deleteUserById(id: String): User
    deleteUserByEmail(email: String): User
    updateUserByEmail(email: String, input: UserInput): User
    updateUserById(id: String, input: UserInput): User
  }
`;

// Add Another schema in my endpoints for sort my file
var schema = makeExecutableSchema({
  typeDefs: [ Endpoints, User ]
})

export default schema;