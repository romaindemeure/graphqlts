var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

// If Message had any complex fields, we'd put them on this object.
class Message {
  id: string
  content: string
  author: string
  constructor(id: string, {content, author}: {content: any, author: any}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

// Maps username to content
var fakeDatabase: (any) = {};

var root = {
  getMessage: ({id}: {id: string}) => {
    console.log(fakeDatabase)
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: ({input}: {input: any}) => {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex');

    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: ({id, input}: {id: string, input: any}) => {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Message(id, input);
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