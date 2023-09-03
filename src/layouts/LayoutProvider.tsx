import { Nav } from './nav';
import { useSignupFirestore } from '../hooks/useSignupFirestore';
import { useAuth } from '@clerk/clerk-react';

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  useSignupFirestore();
  const { isSignedIn } = useAuth();
  return (
    <div className='mx-auto w-screen bg-slate-100 dark:bg-slate-800'>
      {isSignedIn && <Nav />}
      <main className='mx-auto w-full'>
        <div className='mx-auto w-full'>{children}</div>
      </main>
    </div>
  );
};
