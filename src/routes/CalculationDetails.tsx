import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserRecord } from '../hooks/useGetUserRecord';
import { useGetCalculationDetails } from '../hooks/useGetCalculationDetails';
import { useState } from 'react';
import { ConfirmationModal } from '../components/ConfirmationModal';

const CalculationDetailsPage = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { handleDelete } = useGetUserRecord();
  const { id } = useParams();
  const navigate = useNavigate();

  const { results } = useGetCalculationDetails(id!);
  if (!results) return null;
  const {
    name,
    createdAt,
    firstParamether,
    secondParamether,
    result,
    operator,
    img,
  } = results;

  const handleDeleteRecord = () => {
    handleDelete(id!);
    navigate('/my-results');
  };

  const handleModalState = () => {
    setConfirmDelete(!confirmDelete);
  };

  return (
    <section className='flex-grow-1 flex flex-col'>
      <img
        className='mx-auto mt-5 rounded-lg'
        src={img}
        alt={`${name} photo`}
      />

      <div className='relative mx-auto my-5 flow-root w-full max-w-xl rounded-lg border border-gray-100 py-3  shadow-xl dark:border-gray-700'>
        <dl className='-my-3 divide-y divide-gray-200 text-sm dark:divide-gray-700'>
          <div className='grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4'>
            <dt className='font-medium text-gray-900 dark:text-white'>Title</dt>
            <dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
              Calculation Result
            </dd>
          </div>

          <div className='grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4'>
            <dt className='font-medium text-gray-900 dark:text-white'>
              Calculated by
            </dt>
            <dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
              {name}
            </dd>
          </div>
          {confirmDelete && (
            <ConfirmationModal
              handleDelete={handleDeleteRecord}
              setConfirmationModal={handleModalState}
            />
          )}

          <div className='grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4'>
            <dt className='font-medium text-gray-900 dark:text-white'>
              Calculation
            </dt>
            <dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
              {firstParamether} {operator} {secondParamether} = {result}
            </dd>
          </div>

          <div className='grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4'>
            <dt className='font-medium text-gray-900 dark:text-white'>
              Created at
            </dt>
            <dd className='text-gray-700 dark:text-gray-200 sm:col-span-2'>
              {createdAt}
            </dd>
          </div>
        </dl>
      </div>
      <button
        className='mx-auto rounded-lg bg-red-300 px-5 py-3 text-white shadow-lg transition-transform hover:scale-105 dark:bg-red-600 '
        onClick={() => setConfirmDelete(!confirmDelete)}
      >
        Remove this record
      </button>
    </section>
  );
};

export default CalculationDetailsPage;
