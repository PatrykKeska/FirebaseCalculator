import React, { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';

interface localUser {
  name: string;
  img: string;
  session: boolean;
  signIn: boolean;
}

const sessionContext = React.createContext({
  name: '',
  img: '',
  setLocalUser: (user: localUser) => {},
  session: false,
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
        });
      } else {
        setLocalUser({
          name: '',
          img: '',
          session: false,
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
