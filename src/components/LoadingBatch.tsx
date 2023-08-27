import '../styles/spinner.css';

export const LoadingBatch = () => {
  return (
    <div className='text-bold bg-red  flex h-screen w-screen flex-grow-0 items-start justify-center bg-slate-100  pt-36 text-4xl font-extrabold dark:bg-slate-800'>
      <div className='spinner flex h-64 w-64 items-center justify-center rounded-full border-4 border-solid bg-sky-400 '>
        <p className=' animate-bounce text-slate-800 dark:text-white'>
          Loading...
        </p>
      </div>
    </div>
  );
};
