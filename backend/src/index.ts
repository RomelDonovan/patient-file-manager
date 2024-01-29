import { initializeApp, applicationDefault } from 'firebase-admin/app';
const app = initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://assist-me-87dc1-default-rtdb.firebaseio.com/'
});

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './db.js';

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  Query: {
    comments() {
      return db.comments;
    },
    comment(_, args) {
      return db.comments.find((comment) => comment.id === args.id)
    },
    users() {
      return db.users;
    },
    user(_, args) {
      return db.users.find((user) => user.id === args.id)
    }
  },
  User: {
    comments(parent) {
      return db.comments.filter((comment) => comment.user_id === parent.id)
    }
  },
  Mutation: {
    deleteComment(_, args) {
      db.comments = db.comments.filter((comment) => comment.id !== args.id)
      return db.comments;
    },
    addComment(_, args) {
      let comment = {
        ...args.comment,
        id: String(db.comments.length + 1),
      }
      db.comments.push(comment)
      return comment;
    },
    editComment(_, args) {
      db.comments = db.comments.map((comment) => {
        if (comment.id === args.id) {
          return {
            ...comment,
            ...args.edit
          }
        }
        return comment;
      })
      return db.comments.find((comment) => comment.id === args.id)
    },
    deleteUser(_, args) {
      db.users = db.users.filter((user) => user.id !== args.id)
      return db.users;
    },
    createUser(_, args) {
      let user = {
        ...args.user,
        id: String(db.users.length + 1),
      }
      db.users.push(user)
      return user;
    },
    editUser(_, args) {
      db.users = db.users.map((user) => {
        if (user.id === args.id) {
          return {
            ...user,
            ...args.edit
          }
        }
        return user;
      })
      return db.users.find((user) => user.id === args.id)
    },
    deletePatient(_, args) {
      db.patients = db.patients.filter((patient) => patient.id !== args.id)
      return db.patients;
    },
    createPatient(_, args) {
      let patient = {
        ...args.patient,
        id: String(db.patients.length + 1),
      }
      db.patients.push(patient)
      return patient;
    },
    editPatient(_, args) {
      db.patients = db.patients.map((patient) => {
        if (patient.id === args.id) {
          return {
            ...patient,
            ...args.edit
          }
        }
        return patient;
      })
      return db.patients.find((patient) => patient.id === args.id)
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);