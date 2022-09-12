var express = require('express');
var { graphqlHTTP } = require('express-graphql');

import schema from "./schema/schemaUsers";
import root from './routes/rootUsers';


const port = 4000

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(port, () => {
  console.log('Running a GraphQL API server at localhost:&{port}/graphql');
});