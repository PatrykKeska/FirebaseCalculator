import { NavLink } from 'react-router-dom';
import { useSession } from '../context/sessionContext';
import { LoadingBatch } from '../components/LoadingBatch';
import { useEffect, useState } from 'react';

export const HomePage = () => {
  const { session } = useSession();
  const [isLoader, setLoader] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      setLoader(false);
    } else {
      setLoader(true);
    }
  }, [session]);
  return (
    <>
      {!session && isLoader && <LoadingBatch />}
      <section className='mx-auto h-screen w-screen text-white dark:bg-gray-800'>
        <div className='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center'>
          <div className='mx-auto max-w-3xl text-center'>
            <h1 className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>
              Get your calculation
              <span className='sm:block'> done in seconds.</span>
            </h1>

            <p className='sm:text-md/relaxed mx-auto mt-4 max-w-xl text-slate-800 dark:text-slate-200'>
              Simplace Calculator is an intuitive online tool that enables users
              to make calculations conveniently. With the added functionality of
              Google login integration, users can securely store and access
              their calculation results while also having the option to browse
              and explore the calculations of other users.
            </p>

            <div className='mt-8 flex flex-wrap justify-center gap-4'>
              {!session && (
                <NavLink
                  to={'/login'}
                  className='block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'
                >
                  Signin with Google
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
