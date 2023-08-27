import { useEffect } from 'react';

import { useAuth } from '@clerk/clerk-react';
import { signInWithCustomToken, getAuth } from 'firebase/auth';
// import { auth } from './lib/firebase';

export const CalculatorPage = () => {
  // const { session } = useSession();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!session) {
  //     navigate('/');
  //   }
  // }),
  //   [session];

  return (
    <>
      <h1>Calculator</h1>
    </>
  );
};
