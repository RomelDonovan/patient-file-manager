import { initializeApp, applicationDefault } from 'firebase-admin/app';
const app = initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://assist-me-87dc1-default-rtdb.firebaseio.com/'
});

