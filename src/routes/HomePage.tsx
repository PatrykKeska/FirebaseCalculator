import { NavLink } from 'react-router-dom';
import { useSession } from '../context/sessionContext';
import { LoadingBatch } from '../components/LoadingBatch';
import { useEffect, useState } from 'react';
import { Docs } from '../components/Docs';
import { PublicDescription } from '../components/PublicDescription';

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
      <section className='mx-auto h-screen w-screen pb-10 text-white dark:bg-gray-800'>
        {!session && (
          <div className='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center'>
            <div className='mx-auto max-w-3xl text-center'>
              <PublicDescription />
              <div className='mt-8 flex flex-wrap justify-center gap-4'>
                {!session && (
                  <NavLink
                    to={'/login'}
                    className='block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition-all hover:scale-95 hover:text-white focus:outline-none focus:ring active:text-opacity-75  dark:hover:opacity-90 sm:w-auto'
                  >
                    Signin
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        )}
        {session && <Docs />}
      </section>
    </>
  );
};
