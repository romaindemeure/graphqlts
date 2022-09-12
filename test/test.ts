var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
import { v4 as uuidv4 } from 'uuid';

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input UserInput {
    first_name: String
    last_name: String
    email: String
  }

  type User {
    id: ID!
    first_name: String
    last_name: String
    email: String
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
  }
`);

// If User had any complex fields, we'd put them on this object.
class User {
  id: string
  first_name: string
  last_name: string
  email: string
  constructor(id: string, {first_name, last_name, email}: {first_name: any, last_name: any, email: any}) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }
}

// Maps username to content
var fakeDatabase: (any) = {};

var root = {
  getUser: ({id}: {id: string}) => {
    if (!fakeDatabase[id]) {
      throw new Error('no User exists with id ' + id);
    }
    const userRes = new User(id, fakeDatabase[id]);
    // userRes.id = id;
    // console.log(userRes)
    return userRes;
  },
  getUsers: () => {
    let Users= [];
    for(const key in fakeDatabase) {
      fakeDatabase[key].id = key;
      Users.push(fakeDatabase[key])
    }
    return Users;
  },
  createUser: ({input}: {input: any}) => {
    // Create a random id for our "database".
    var id = uuidv4();

    fakeDatabase[id] = input;
    return new User(id, input);
  },
  updateUser: ({id, input}: {id: string, input: any}) => {
    if (!fakeDatabase[id]) {
      throw new Error('no User exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new User(id, input);
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});


// var express = require('express');
// var { graphqlHTTP } = require('express-graphql');
// var { buildSchema } = require('graphql');
// import { v4 as uuidv4 } from 'uuid';

// // Construire un schéma, en utilisant le langage de schéma GraphQL
// var schema = buildSchema(`
//   input UserInput {
//     user_email: String
//     first_name: String
//     last_name: String
//   } 

//   type User {
//     id: String
//     user_email: String
//     first_name: String
//     last_name: String
//   }

//   type Query {
//     getUser(id: String): User
//     getUsers: [User]
//   }

//   type Mutation {
//     createUser(input: UserInput): User
//   }
// `);


// // Création de notre class User pour pouvoir créer plusieurs objet de User
// class User {
//   id: string;
//   prenom: string;
//   nom: string;
//   email: string;
//   constructor(id: string, {prenom, nom, email}: {prenom: string, nom: string, email: string}) {
//     this.id = id
//     this.prenom = prenom
//     this.nom = nom
//     this.email = email
//   } 
// }


// var fakeDatabase: { [key: string]: string; } = {}

// var root = {
//   getUser: ({id}: {id: string}) => {
//     if (!fakeDatabase[id]) {
//       throw new Error("no user exists with id" + id)
//     }
//     return fakeDatabase[id];
//   },

//   getUsers: () => {
//     let users = [];
//     for (const key in fakeDatabase) {
//       users.push(fakeDatabase[key]);
//     }
//     return users;
//   },

//   createUser: ({input} :any) => {
//     var id = uuidv4();
    
//     fakeDatabase[id] = input;
//     return new User(id, input);
//   },
  
// }

// // Server with express js
// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
// app.listen(4000);
// console.log('Running a GraphQL API server at http://localhost:4000/graphql');