import { CalculationSchema } from '../types/dbSchema';
import { CalculationCardWrapper } from '../layouts/CalculationCardWrapper';

interface userCalcProps {
  cardDetails: CalculationSchema;
  noDelete?: boolean;
}

export const ResultCard = ({
  cardDetails: {
    id,
    fullName,
    imageUrl,
    firstParamether,
    operator,
    secondParamether,
    result,
    createdAt,
  },
  noDelete,
}: userCalcProps) => {
  return (
    <CalculationCardWrapper id={id} noDelete={noDelete}>
      <span className='absolute  inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 dark:bg-gradient-to-r  dark:from-purple-500 dark:to-pink-600'></span>

      <div className='sm:flex sm:justify-between sm:gap-4'>
        <div>
          <h3 className='text-lg font-bold text-gray-900 dark:text-white sm:text-xl'>
            Calculation Result
          </h3>

          <p className='mt-1 text-xs font-medium text-gray-600 dark:text-slate-100'>
            By {fullName}
          </p>
        </div>

        <div className=' sm:block sm:shrink-0'>
          <img
            alt={fullName}
            src={imageUrl}
            className='my-2 h-10 w-10 rounded-lg object-cover shadow-sm sm:h-16 sm:w-16'
          />
        </div>
      </div>

      <div className='mt-4'>
        <p className='flex max-w-[40ch] flex-wrap text-sm text-gray-500 dark:text-slate-100'>
          {firstParamether} {operator} {secondParamether} = {result}
        </p>
      </div>

      <dl className='mt-6 flex gap-4 sm:gap-6'>
        <div className='flex flex-col-reverse items-center justify-center'>
          <dd className='text-xs text-gray-500 dark:text-slate-100'>
            {createdAt}
          </dd>
        </div>
      </dl>
    </CalculationCardWrapper>
  );
};
