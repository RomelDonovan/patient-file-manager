import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
// import db from './db.js';

import admin from 'firebase-admin';

const serviceAccount: admin.ServiceAccount = {
  projectId: "sentry-health-79f48",
  privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJjDK2y6bJB2za\nI49ZASwuPoObIWwW9aysQubUGzVN3bL2xQSQlPjpTfTWrv4QsBJ0SFFPcMNDnjZR\nMQ/+AONi+n5DGycsHv1nx7nxp0krI3qAlojgZLgBjyhPS7CuiXcfulMD0dVncMJy\nToWMIgIcyvjgqCWihA12rEHcM3GjxLcMsQm8TrTyjySc3cwvl8Bb/82SaKZR7nPg\nD79U/7wfgMgmP6hoA78DYBbRJxdz+8+UAHbrLRq/UvO8XgQ6PIicAV7ADp0stXqw\nKcRc4/KkI0dBiqT5qaOT7Hf+Yfpy7r57JqcGaUTu4Xx7S8llxOt8rltqBidFJONr\naldOzvJRAgMBAAECggEAF8jZu0SxPAwKRnvn0MMYqaRq94WsMdFwPSvv/ZvwYG4H\nTqPVdBKAhVfTyvn/tYxxwRM/tTZDdNlY45/8mScVrnqNJ/IuX0CQ+wxQ3zm0osif\nDkm1gXWhWV3BjgoKoa5LRo1AerTqkDh4WfD2RaFFyowRbsGpH1KiHB0b8JaJlJ/O\ntZWWQ7/tXtH7mqFbrOjPAslMTJgSm9PiUnlwHcWIMN54+Un3neDK0wrl/4Y/gwOz\nQIeBfvPdCpihn6G41DFbXIfBPiJzY8Q/74tWD6SeL38MYqObzQ/7P6wOU8gWhoZi\nWAUuPhxqum5fqKzGjr7QFmsr25yJ9s/313rqsVKyoQKBgQDjQa+aHvy4uPL6CtiE\nEJ0TtgQDP7TW7wfrOFJRsSq1haUogKy9jkZdqpa0Mohkc5ePUBF3WS4f0kwTHN6N\nUD9n6OQ6dCZ0qkmrUosxN6+aKy2nFAt8Tm/2cULp3o0z2OSAx+rKv0pBYNDPd57E\nuoK1xHlAyUp0UGl5SZvNOfTdtQKBgQDjChXlrFdxYFvv5VYJfF+AX4kHGW0RQoMH\nSUdfO/lfGUXyq8QCOYT0Hs24Vg4l0Z0K9z9doIPpkOK5bFiW02h0YbczECMoxF6U\nYyNjLunf+4iYpCEje6JDjlQW5sCCEC3UGImSa7VlLHK3gXGYUEC50P3AK88LOUCn\n6oDyJEwDrQKBgDhy/YKEBfSAhGJVxVhwpAPcZ3zDG1F0SHxGHjSKlHhIfTDlXYMs\nTxA/KnYSQ0zoZZJEqkICFfHzk8//kMx7TXSrJd3bMh4ymmAC/e44zda2uP1SflPf\nS/JkSeG71Uk2q/PNNOYtw+0fdl7CcN6fEY7DAfd0yJjBzKFDBn9g0REtAoGBAMny\nkKOodmc8pMpwHeV2IaSYVdRgw2kU1mPGxJtrR1dVrag7LLAl5aMXOzl6Ij91gdDd\nOBnZyzwYSfNQ8kPGbCUJPeFHu15pvQ8UV8fDVPiMTmYnp+pd8GlS0m1Ed3u5VGpS\nIRyCfekubiPYGei3ibs+sFcdIJ8FIAO8TVIVAyBJAoGBAJ0AZZP7e5DMFfWSJUhk\nYSHrMRD8ANB5WftISkEYEG8R9XLNUEcuf2ScEzwdNkUYne8/glCdxTK8TcGpKzgI\nvC2MMjdr+Sc0J83QyYmyC9RZURF8dizuhYopwmwjVTAl8GH/KrnV3iZ767VYByrV\n9cZaLKTyuAU6iRCJCH1OixRE\n-----END PRIVATE KEY-----\n",
  clientEmail: "firebase-adminsdk-gddfy@sentry-health-79f48.iam.gserviceaccount.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  Query: {
    async comments() {
      const commentsDoc = await admin
        .firestore()
        .collection('comments')
        .get();
      const comments = commentsDoc.docs.map((comment) => {
        return {
          id: comment.id,
          ...comment.data(),
        };
      });
      return comments;
    },
    async comment(_, args) {
      const commentDoc = await admin
        .firestore()
        .doc(`comments/${args.id}`)
        .get();
      const comment = commentDoc.data();
      return comment;
    },
    async users() {
      const usersDoc = await admin
        .firestore()
        .collection('users')
        .get();
      const users = usersDoc.docs.map((user) => {
        return {
          id: user.id,
          ...user.data(),
        };
      });
      return users;
    },
    async user(_, args) {
      const userDoc = await admin
        .firestore()
        .doc(`users/${args.id}`)
        .get();
      const user = userDoc.data();
      return user;
    }
  },
  User: {
    async comments(parent) {
      const comments = await admin
        .firestore()
        .collection('comments')
        .where('user_id', '==', parent.id)
        .get();
      return comments.docs.map((comment) => comment.data());
    }
  },
  Mutation: {
    // Comments
    async deleteComment(_, args) {
      await admin
        .firestore()
        .doc(`comments/${args.id}`)
        .delete();
      return args.id;
    },
    async addComment(_, args) {
      await admin
        .firestore()
        .collection('comments')
        .add(args.comment);
      return args.comment;
    },
    async editComment(_, args) {
      await admin
        .firestore()
        .doc(`comments/${args.id}`)
        .update(args.edit);
      const commentDoc = await admin
        .firestore()
        .doc(`comments/${args.id}`)
        .get();
      const comment = commentDoc.data();
      return comment;
    },

    // Users
    async deleteUser(_, args) {
      await admin
        .firestore()
        .doc(`users/${args.id}`)
        .delete();
      return args.id;
    },
    async createUser(_, args) {
      await admin
        .firestore()
        .collection('users')
        .add(args.user);
      return args.user;
    },
    async editUser(_, args) {
      await admin
        .firestore()
        .doc(`users/${args.id}`)
        .update(args.edit);
      const userDoc = await admin
        .firestore()
        .doc(`users/${args.id}`)
        .get();
      const user = userDoc.data();
      return user;
    },

    // Patients
    async deletePatient(_, args) {
      await admin
        .firestore()
        .doc(`patients/${args.id}`)
        .delete();
      return args.id;
    },
    async createPatient(_, args) {
      await admin
        .firestore()
        .collection('patients')
        .add(args.patient);
      return args.patient;
    },
    async editPatient(_, args) {
      await admin
        .firestore()
        .doc(`patients/${args.id}`)
        .update(args.edit);
      const patientDoc = await admin
        .firestore()
        .doc(`patients/${args.id}`)
        .get();
      const patient = patientDoc.data();
      return patient;
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