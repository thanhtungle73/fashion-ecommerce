// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth, fireStore } from '@/app/firebase-admin';
import Cookies from 'cookies';
import { BaseUserProfile } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createOrUpdateUserProfile, getUserPhoto } from 'services/user.service';

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(401).json({ message: 'Invalid authentication' });
  }

  let userData: BaseUserProfile = { email: null, uid: null };
  let publicPhotoUrl: string | undefined = undefined;
  const cookies = new Cookies(req, res);
  const sessionCookie = cookies.get('authCookie');

  if (sessionCookie) {
    await auth
      .verifySessionCookie(sessionCookie, true)
      .then(async (decodedClaims) => {
        try {
          // Get user photo if it is exiting on Firebase storage else undefined.
          // publicPhotoUrl = await getUserPhoto(decodedClaims);

          await auth.getUser(decodedClaims.uid).then(async (userRecord) => {
            const profileCollection = fireStore.collection('userProfile');
            const currentProfile = await profileCollection.doc(userRecord.uid).get();

            if (!currentProfile.data()) {
              // Create new user profile collection for new user.
              userData = {
                ...userData,
                ...userRecord,
                photoURL: publicPhotoUrl,
                phoneNumber: null,
              };

              await createOrUpdateUserProfile(fireStore, userData);
            } else {
              // Get user profile for existing user.
              userData = { ...userRecord, ...currentProfile.data() };
            }
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log('Failed to verify cookie by: ', error);
      });
    res.status(200).end(JSON.stringify(userData));
  } else {
    res.status(401).end(JSON.stringify(userData));
  }
}
