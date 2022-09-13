// var express = require('express');
// var { graphqlHTTP } = require('express-graphql');

// import schema from "./schema/schema";
// import root from './routes/UsersRoot';

// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
// app.listen(4000, () => {
//   console.log('Running a GraphQL API server at localhost:4000/graphql');
// });


import "reflect-metadata"; 
import {createConnection} from "typeorm"; 
import { User } from "../src/entity/User"; 

createConnection().then(async connection => { 

   console.log("Inserting a new Student into the database..."); const std = new Student(); std.Name = "Student1"; 
   std.Country = "India"; 
   await connection.manager.save(std); console.log("Saved a new user with id: " + std.id); 
   
   console.log("Loading users from the database..."); 
   const stds = await connection.manager.find(Student); console.log("Loaded users: ", stds); 
   
   console.log("TypeORM with MongoDB"); 
}).catch(error => console.log(error));