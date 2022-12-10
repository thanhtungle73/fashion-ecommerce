import serviceKey from '@/utils/serviceKey';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceKey),
    storageBucket: serviceKey.bucket,
  });
}

const fireStore = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

export { fireStore, auth, storage };
