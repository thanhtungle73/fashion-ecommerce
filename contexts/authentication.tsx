import { UserData } from 'models/common';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{
  userDataContext: UserData | null;
  setNewUser: any;
  firstLoading: boolean;
}>({
  userDataContext: null,
  setNewUser: null,
  firstLoading: true,
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserData>({ authenticated: false, email: '', uid: '' });
  const [userDataContext, setUserDataContext] = useState<UserData | null>(null);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const url = '/api/userProfile';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      const userData = { ...data };
      setUserDataContext(userData);
      setFirstLoading(false);
    })();
  }, [user]);

  const setNewUser = (newUser: UserData) => {
    const user = { ...newUser };
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ userDataContext, setNewUser, firstLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
