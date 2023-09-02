import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const googleSignout = () => {
  signOut(auth)
    .then(() => {
      console.log('Signout Succesfull');
    })
    .catch((error) => {
      throw new Error(error);
    });
  localStorage.removeItem('accessToken');
};
