import { useAuth } from '@clerk/clerk-react';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { useEffect } from 'react';

export const useSignupFirestore = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const signInWithClerk = async () => {
      const auth = getAuth();
      const token = await getToken({ template: 'integration_firebase' });
      if (token) {
        await signInWithCustomToken(auth, token);
      }
    };

    signInWithClerk();
  }, []);
};
