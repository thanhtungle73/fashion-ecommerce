// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from 'cookies';
import { UserData } from 'models/common';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(401).json({ message: 'Method Not Supported' });
  }

  let user: UserData = { authenticated: false, email: '', uid: '', displayName: '', photoURL: '' };
  const cookies = new Cookies(req, res);
  cookies.set('authCookie');

  // Call data from Firestore and return data here as api response
  res.status(200).end(JSON.stringify({ ...user }));
}
