// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql

  type Comment {
    id: ID!
    comment: String!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
    comments: [Comment!]
  }
  
  type Patient {
    id: ID!
    name: String!
  }

  type Query {
    comments: [Comment]
    comment(id: ID!): Comment
    users: [User]
    user(id: ID!): User
    patients: [Patient]
    patient(id: ID!): Patient
  }

  type Mutation {
    addComment(comment: AddCommentInput!): Comment
    deleteComment(id: ID!): [Comment]
    editComment(id: ID!, edit: EditCommentInput!): Comment
    createUser(user: CreateUserInput!): User
    deleteUser(id: ID!): [User]
    editUser(id: ID!, edit: EditUserInput!): User
    createPatient(patient: CreatePatientInput!): Patient
    deletePatient(id: ID!): [Patient]
    editPatient(id: ID!, edit: EditPatientInput!): Patient
  }
  
  input AddCommentInput {
    comment: String!
  }

  input EditCommentInput{
    comment: String
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    role: String!
  }

  input EditUserInput {
    name: String
    email: String
    password: String
    role: String
  }

  input CreatePatientInput {
    name: String!
  }

  input EditPatientInput {
    name: String
  }
`;