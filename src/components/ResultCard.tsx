import { useState } from 'react';
import { CalculationSchema } from '../types/dbSchema';
import { useGetUserRecord } from '../hooks/useGetUserRecord';

interface userCalcProps {
  cardDetails: CalculationSchema;
  noDelete?: boolean;
}

export const ResultCard = ({
  cardDetails: {
    id,
    name,
    img,
    firstParamether,
    operator,
    secondParamether,
    result,
    createdAt,
  },
  noDelete,
}: userCalcProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const { handleDelete } = useGetUserRecord();

  const handleRemoveItem = () => {
    setIsClicked(false);
    handleDelete(id);
  };

  return (
    <>
      <div className=' relative block overflow-hidden rounded-lg border border-gray-100 p-4 pb-6 shadow-xl transition-all ease-in-out hover:rotate-2 hover:scale-105  hover:cursor-pointer dark:bg-slate-900 sm:p-6 lg:p-8'>
        <span className='absolute  inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 dark:bg-gradient-to-r  dark:from-purple-500 dark:to-pink-600'></span>

        <div className='sm:flex sm:justify-between sm:gap-4'>
          <div>
            <h3 className='text-lg font-bold text-gray-900 dark:text-white sm:text-xl'>
              Calculation Result
            </h3>

            <p className='mt-1 text-xs font-medium text-gray-600 dark:text-slate-100'>
              By {name}
            </p>
          </div>

          <div className='hidden sm:block sm:shrink-0'>
            <img
              alt={name}
              src={img}
              className='h-16 w-16 rounded-lg object-cover shadow-sm'
            />
          </div>
        </div>

        <div className='mt-4'>
          <p className='max-w-[40ch] text-sm text-gray-500 dark:text-slate-100'>
            {firstParamether} {operator} {secondParamether} = {result}
          </p>
        </div>

        <dl className='mt-6 flex gap-4 sm:gap-6'>
          <div className='flex flex-col-reverse items-center justify-center'>
            <dd className='text-xs text-gray-500 dark:text-slate-100'>
              {createdAt}
            </dd>
          </div>
          {!noDelete && (
            <button
              className=' rounded-md bg-red-300 px-5 py-2 dark:bg-red-500'
              onClick={() => setIsClicked(true)}
            >
              Remove Record
            </button>
          )}
        </dl>
        {isClicked && (
          <div className='absolute inset-0 flex w-full flex-col items-center justify-center bg-sky-200 p-5 dark:bg-slate-900 '>
            <p className='text-md text-center font-bold text-gray-900 dark:text-white'>
              Are you sure you want to remove this record?{' '}
            </p>
            <div className='mt-2 flex flex-row items-center justify-center gap-5'>
              <button
                className='rounded-lg bg-green-400 px-8 py-2 transition-all ease-in-out hover:scale-95 hover:cursor-pointer dark:bg-green-500'
                onClick={handleRemoveItem}
              >
                Yes
              </button>
              <button
                className='ransition-all rounded-lg bg-red-300 px-8 py-2 transition-all ease-in-out hover:scale-95 hover:cursor-pointer dark:bg-red-500'
                onClick={() => setIsClicked(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
