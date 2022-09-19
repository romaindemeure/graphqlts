// Schema of User
// UserInput it's why user need to write
// User it's the real schema of User, there are many things completed automatically like _id or created_at
// Mutation it's for create user with input return UserInput and all return User
export default `
  input UserInput {
    first_name: String
    last_name: String
    email: String
    description: String
  }

  type User {
    _id: String
    first_name: String
    last_name: String
    email: String
    description: String
    created_at: String
    updated_at: String
  }

  type Mutation {
    createUser(input: UserInput): User
  }
`