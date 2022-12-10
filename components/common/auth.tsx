import { authApi } from '@/api-client';
import { useAuthContext } from '@/context/authentication';
import LoadingModal from 'components/Loading';
import { UserData } from 'models';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

export interface IAuthProps {
  children: any;
}

export default function Auth({ children }: IAuthProps) {
  const router = useRouter();
  const { userDataContext } = useAuthContext();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    (async () => {
      const response = await authApi.verifyCookie();
      const userData: UserData | null = { ...response.data };
      setUser(userData);
      if (!userData?.authenticated) router.push('/authentication?form=login');
    })();
  }, [router, userDataContext]);

  // Show loading and check to see if the user was logged in by get user data from context.
  if (!user?.authenticated) {
    return <LoadingModal />;
  }

  if (user?.authenticated && !userDataContext?.customClaims?.admin) {
    return <div>404 Not Found</div>;
  }

  return <div>{children}</div>;
}
