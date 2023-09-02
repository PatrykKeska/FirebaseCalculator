interface ConfirmationModalProps {
  setConfirmationModal: () => void;
  handleDelete: () => void;
}

export const ConfirmationModal = ({
  handleDelete,
  setConfirmationModal,
}: ConfirmationModalProps) => {
  return (
    <div className='absolute inset-0 flex w-full items-center justify-center gap-5 rounded-lg bg-sky-400/90 dark:bg-sky-700/80'>
      <button
        className='rounded-lg bg-green-400 px-10 py-3 text-white shadow-lg transition-transform hover:scale-105 dark:bg-green-600 '
        onClick={handleDelete}
      >
        Yes
      </button>

      <button
        className=' rounded-lg bg-red-300 px-10 py-3 text-white shadow-lg transition-transform hover:scale-105 dark:bg-red-600 '
        onClick={setConfirmationModal}
      >
        No
      </button>
    </div>
  );
};
