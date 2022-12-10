// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from '@/app/firebase-admin';
import Cookies from 'cookies';
import { UserData } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(401).json({ message: 'Invalid authentication' });
  }

  let userData: UserData = { authenticated: false, email: undefined, uid: undefined };
  const cookies = new Cookies(req, res);
  const sessionCookie = cookies.get('authCookie');

  if (sessionCookie) {
    await auth
      .verifySessionCookie(sessionCookie, true)
      .then((decodedClaims) => {
        userData = {
          ...userData,
          email: decodedClaims.email,
          uid: decodedClaims.uid,
          authenticated: Boolean(decodedClaims),
        };
      })
      .catch((error) => {
        console.log('Failed to verify cookie by: ', error);
        userData.authenticated = false;
      });
    res.status(200).end(JSON.stringify(userData));
  } else {
    res.status(401).end(JSON.stringify(userData));
  }
}
