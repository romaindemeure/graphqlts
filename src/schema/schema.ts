import { buildSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import User from './schemaUsers'

var schema = buildSchema(`
  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }
`);

var schema = makeExecutableSchema({
  typeDefs: [ User ]
})

export default schema;