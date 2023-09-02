import clsx from 'clsx';

interface CalculatorButtonProps {
  type: string | number;
  onClick: () => void;
  value: string | number;
}

export const CalculatorButton = ({
  type,
  onClick,
  value,
}: CalculatorButtonProps) => {
  return (
    <>
      <button
        className={clsx(
          `m-0 inline-block h-16 p-0 ${
            type === 'number'
              ? 'bg-slate-400 dark:bg-slate-700'
              : 'bg-orange-400 dark:bg-orange-500'
          }   rounded-sm text-2xl text-white transition-colors duration-200 hover:bg-opacity-80
          dark:hover:bg-opacity-60
          ${value === 'C' && 'bg-red-500 dark:bg-red-700'}
          ${value === '=' ? 'col-span-2' : 'col-span-1'}
          `
        )}
        value={value}
        onClick={onClick}
      >
        {value}
      </button>
    </>
  );
};
