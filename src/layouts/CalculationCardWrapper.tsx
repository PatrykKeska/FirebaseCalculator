import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface CalculationCardProps {
  id?: string;
  children: ReactNode | ReactNode[];
  noDelete?: boolean;
}

export const CalculationCardWrapper = ({
  children,
  id,
  noDelete,
}: CalculationCardProps) => {
  return (
    <>
      {!noDelete ? (
        <Link
          to={`/my-results/${id}`}
          className=' relative block w-80 overflow-hidden rounded-lg border border-gray-100 p-4 pb-6 shadow-xl transition-all ease-in-out hover:rotate-2 hover:scale-105  hover:cursor-pointer dark:bg-slate-900 sm:p-6 lg:p-8'
        >
          {children}
        </Link>
      ) : (
        <div className=' relative block w-80 overflow-hidden rounded-lg border border-gray-100 p-4 pb-6 shadow-xl transition-all ease-in-out hover:rotate-2 hover:scale-105   dark:bg-slate-900 sm:p-6 lg:p-8'>
          {children}
        </div>
      )}
    </>
  );
};
