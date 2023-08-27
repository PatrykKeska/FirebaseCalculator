import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../lib/firebase';

export const handleSignIn = async () => {
  const response = await signInWithPopup(auth, provider);
  const { user } = response;
  return user;
};
