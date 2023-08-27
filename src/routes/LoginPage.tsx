import { useEffect } from 'react';
import { handleSignIn } from '../utils/googleSignin';
import { useSession } from '../context/sessionContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/calculator');
    }
  }, [session]);
  return (
    <section className='mx-auto grid h-screen w-screen place-items-center bg-gray-800 text-white'>
      <button
        onClick={handleSignIn}
        className='block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'
      >
        Signin with Google
      </button>
    </section>
  );
};
