// Schema of User
// UserInput it's why user need to write
// User it's the real schema of User, there are many things completed automatically like _id or created_at
// Mutation it's for create user with input return UserInput and all return User
export default `
  input UserInput {
    email: String
    first_name: String
    last_name: String
    description: String
    password: String
  }

  type User {
    id: String
    first_name: String
    last_name: String
    email: String
    description: String
    created_at: String
    updated_at: String
  }
`


// mutation {
//   createUser(input: {
//     first_name: "test"
//     last_name: "test"
//     email: "test@mail.com"
//     description: "I'm a test"
//   })
// }