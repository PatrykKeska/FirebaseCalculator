import { CalculatorButton } from '../components/CalculatorButton';
import { useCalculate } from '../hooks/useCalculate';
import { useAddRecordToDatabse } from '../hooks/useAddRecordToDatabase';
import { ConfirmationAlert } from '../components/ConfirmationAlert';
import { LoadingBatch } from '../components/LoadingBatch';
export const CalculatorLayout = () => {
  const {
    pendingOperator,
    waitingForOperand,
    display,
    result,
    buttonList,
    logs,
    setLogs,
  } = useCalculate();

  const { addRecord, isError, isSuccess, isLoading } = useAddRecordToDatabse(
    logs,
    setLogs
  );

  return (
    <>
      <section className='flex flex-col gap-10'>
        {isError && <ConfirmationAlert failed />}
        {isSuccess && <ConfirmationAlert />}
        {isLoading && <LoadingBatch transparent />}
        <section className='mx-auto mt-5 w-full max-w-[330px] rounded-md bg-slate-900 pb-1 dark:bg-slate-500 md:mt-10 lg:mt-16'>
          <section className='mx-auto  w-full max-w-xs'>
            <input
              onChange={() => null}
              value={
                typeof pendingOperator !== 'undefined'
                  ? `${result}${pendingOperator}${
                      waitingForOperand ? '' : display
                    }`
                  : ''
              }
              className='mx-auto w-full max-w-xs rounded-sm bg-slate-800  pr-5 pt-5 text-right text-sm font-bold text-slate-300 dark:bg-slate-500  dark:text-slate-300'
              type='text'
            />
            <input
              onChange={() => null}
              value={display}
              className='mx-auto w-full max-w-xs rounded-sm  bg-slate-800 p-6 text-right text-2xl font-bold text-white dark:bg-slate-500  dark:text-slate-100'
              type='text'
            />
          </section>
          <section className='pt-25 mx-auto grid max-w-xs grid-cols-4 gap-1'>
            {buttonList.map((button, index) => (
              <CalculatorButton
                key={index}
                value={button.value}
                onClick={button.onClick}
                type={button.type}
              />
            ))}
          </section>
        </section>
        <button
          className='w-52 place-self-center rounded-xl bg-orange-500  px-5 py-5 font-bold text-white shadow-xl transition duration-300 ease-in-out hover:scale-95 dark:text-slate-800 '
          type='submit'
          onClick={addRecord}
        >
          Save Calculation
        </button>
      </section>
    </>
  );
};
