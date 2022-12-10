/* eslint-disable object-curly-spacing */
import { BaseUserProfile } from './../../../models/user';
// const functions = require('firebase-functions');

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
try {
  admin.initializeApp();
} catch (err) {
  admin.app();
}

const fireStore = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((req, res) => {
  res.send('Hello from Firebase');
});

export const bigben = functions.https.onRequest((req, res) => {
  const hours = (new Date().getHours() % 12) + 1; // London is UTC + 1hr;
  res.status(200).send(`<!doctype html>
      <head>
        <title>Time</title>
      </head>
      <body>
        ${'BONG '.repeat(hours)}
      </body>
    </html>`);
});

export const createUser = functions.https.onRequest(async (req, res) => {
  const data: BaseUserProfile = {
    email: '',
    displayName: '',
    uid: '',
  };

  const db = fireStore;
  const profileCollection = db.collection('userProfile');

  if (data.uid) {
    const currentProfile = await profileCollection.doc(data.uid).get();
    const _data = currentProfile.data() ? { ...currentProfile.data(), ...data } : { ...data };
    try {
      await profileCollection.doc(data.uid).set(JSON.parse(JSON.stringify({ ..._data })));
    } catch (e) {
      console.log('error', e);
    }

    res.status(200).send({
      data: profileCollection.doc(data.uid).get(),
    });
  } else {
    res.status(200).send({
      data: (await profileCollection.add(data)).get(),
    });
  }
});
