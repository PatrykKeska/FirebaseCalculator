import React, { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';

interface localUser {
  name: string;
  img: string;
  session: boolean;
  signIn: boolean;
  email: string;
}

const sessionContext = React.createContext({
  name: '',
  img: '',
  setLocalUser: (user: localUser) => {},
  session: false,
  email: '',
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [localUser, setLocalUser] = useState({
    name: '',
    img: '',
    session: false,
    email: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (!token) {
          localStorage.setItem(
            'accessToken',
            JSON.stringify({
              token: user.refreshToken,
            })
          );
        }
        setLocalUser({
          name: user.displayName!,
          img: user.photoURL!,
          session: true,
          email: user.email!,
        });
      } else {
        setLocalUser({
          name: '',
          img: '',
          session: false,
          email: '',
        });
        localStorage.removeItem('accessToken');
      }
    });
  }, []);

  return (
    <sessionContext.Provider
      value={{
        name: localUser.name,
        img: localUser.img,
        setLocalUser,
        session: localUser.session,
        email: localUser.email,
      }}
    >
      {children}
    </sessionContext.Provider>
  );
};

export const useSession = () => {
  const context = React.useContext(sessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context;
};
