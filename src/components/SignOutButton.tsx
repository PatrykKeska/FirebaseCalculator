import { NavLink } from 'react-router-dom';
import { googleSignout } from '../utils/googleSignout';

export const SignOutButton = () => {
  return <NavLink onClick={googleSignout} to='/' />;
};
