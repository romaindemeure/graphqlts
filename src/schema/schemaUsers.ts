export default `
  input UserInput {
    first_name: String
    last_name: String
    email: String
  }

  type User {
    first_name: String
    last_name: String
    email: String
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
  }
`