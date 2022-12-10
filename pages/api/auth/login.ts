// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from '@/app/firebase-admin';
import Cookies from 'cookies';
import { UserData } from 'models/common';
import type { NextApiRequest, NextApiResponse } from 'next';
import { updateUserProfile } from 'services/user.service';

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(401).json({ message: 'Invalid authentication' });

  // Cookie will be expired after 1 hour.
  const expiresIn = 60 * 60 * 1000;

  const accessToken = req.body.accessToken;
  const displayName = req.body.displayName || null;

  let user: UserData = {
    authenticated: false,
    email: undefined,
    uid: undefined,
    displayName: undefined,
  };

  const cookie = await auth.verifyIdToken(accessToken).then(async (decodedIdToken) => {
    const { email, uid } = decodedIdToken;

    // Only process if the user just signed in in the last 5 minutes.
    if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
      if (
        typeof decodedIdToken.email !== 'undefined' &&
        decodedIdToken.email?.endsWith('@admin.com')
      ) {
        // Add custom claims admin = true for admin user.
        await auth.setCustomUserClaims(uid, { admin: true });
        user = { authenticated: true, email, uid, displayName };
        await updateUserProfile(uid, user);
      } else {
        // Add displayName for new user.
        user = { authenticated: true, email, uid, displayName };
        await updateUserProfile(uid, user);
      }

      return auth.createSessionCookie(accessToken, { expiresIn });
    }

    res.status(401).json({ message: 'Recent sign in required!' });
  });

  if (cookie) {
    const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
    cookies.set('authCookie', cookie, {
      maxAge: expiresIn,
      httpOnly: true,
      sameSite: 'lax',
    });

    res.status(200).end(JSON.stringify({ ...user }));
  } else {
    res.status(401).json({ message: 'Invalid authentication' });
  }
}
