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
    file: [File!]
  }

  type File {
    id: ID!
    name: String!
    file: String!
    patient: [Patient!]
  }

  type Query {
    comments: [Comment]
    comment(id: ID!): Comment
    users: [User]
    user(id: ID!): User
    patients: [Patient]
    patient(id: ID!): Patient
    files: [File]
    file(id: ID!): File
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
    createFile(file: CreateFileInput!): File
    deleteFile(id: ID!): [File]
    editFile(id: ID!, edit: EditFileInput!): File
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

  input CreateFileInput {
    name: String!
    file: [String!]
  }

  input EditFileInput {
    name: String
    file: [String]
  }
`;
