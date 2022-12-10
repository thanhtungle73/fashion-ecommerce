import { auth, storage } from '@/app/firebase-admin';
import { firestore } from 'firebase-admin';
import { BaseUserProfile, UserData } from 'models';

// Authentication - update user profile
export const updateUserProfile = async (uid: string, user: UserData) => {
  await auth
    .updateUser(uid, user)
    .then((userRecord) => {
      return { ...user, ...userRecord };
    })
    .catch((error) => {
      console.log('Failed to update userProfile by: ', error);
    });
};

// Firestore - Update user profile and save
export const createOrUpdateUserProfile = async (
  db: firestore.Firestore,
  data: BaseUserProfile
): Promise<firestore.DocumentData | undefined> => {
  const profileCollection = db.collection('userProfile');

  if (data.uid) {
    const currentProfile = await profileCollection.doc(data.uid).get();
    const _data = currentProfile.data() ? { ...currentProfile.data(), ...data } : { ...data };
    try {
      await profileCollection.doc(data.uid).set(JSON.parse(JSON.stringify({ ..._data })));
    } catch (e) {
      console.log('error', e);
    }

    return profileCollection.doc(data.uid).get();
  } else {
    return (await profileCollection.add(data)).get();
  }
};

// Storage
export const getUserPhoto = async (decodedClaims: any) => {
  const bucket = storage.bucket();

  return await bucket
    .file(`userProfile/avatar/${decodedClaims.uid}.png`)
    .exists()
    .then(async (exists) => {
      if (exists[0]) {
        const photoURL = await bucket
          .file(`userProfile/avatar/${decodedClaims.uid}.png`)
          .getSignedUrl({ action: 'read', expires: '03-09-2491' });
        return photoURL[0];
      } else {
        return undefined;
      }
    });
};
