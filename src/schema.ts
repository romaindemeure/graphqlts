import { buildSchema } from 'graphql';

import User from './Users/schemaUsers'

var schema = buildSchema(`
  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }
`);

// var schema = buildSchema({
//     typeDefs: [ User ]
//   })