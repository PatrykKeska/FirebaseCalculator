import { LoadingBatch } from '../components/LoadingBatch';
import { Docs } from '../components/Docs';
import { PublicDescription } from '../components/PublicDescription';
import { SignIn, useUser } from '@clerk/clerk-react';
import { LayoutProvider } from '../layouts/LayoutProvider';

export const HomePage = () => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <LayoutProvider>
      {!isLoaded && <LoadingBatch />}
      <section className='mx-auto h-screen w-screen pb-10 text-white dark:bg-gray-800'>
        {!isSignedIn && (
          <div className='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center'>
            <div className='mx-auto max-w-3xl text-center'>
              <PublicDescription />
              <div className='mt-8 flex flex-wrap justify-center gap-4'>
                {!isSignedIn && <SignIn />}
              </div>
            </div>
          </div>
        )}
        {isSignedIn && <Docs />}
      </section>
    </LayoutProvider>
  );
};
