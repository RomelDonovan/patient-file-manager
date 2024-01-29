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

  type Query {
    comments: [Comment]
    comment(id: ID!): Comment
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    deleteComment(id: ID!): [Comment]
  }
`;