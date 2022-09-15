var express = require('express');
var { graphqlHTTP } = require('express-graphql');

import schema from "./schema/schema";
import root from './routes/UsersRoot';
import db from './config/config';

(async () => {
  await db.initialize();
  const app = express();
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
  app.listen(4000, () => {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
  });
})();