import { useSession } from '../context/sessionContext';
import { Nav } from './nav';

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { session } = useSession();
  return (
    <div className='mx-auto w-screen bg-slate-100 dark:bg-slate-800'>
      {session && <Nav />}
      <main className='mx-auto w-full'>
        <div className='mx-auto w-full'>{children}</div>
      </main>
    </div>
  );
};
