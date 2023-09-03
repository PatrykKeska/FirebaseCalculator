import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { LogsInterface } from './useCalculate';
import { db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { getTimeStamp } from '../utils/getTimeStamp';
import { useUser } from '@clerk/clerk-react';

export const useAddRecordToDatabse = (
  logs: LogsInterface,
  setLogs: (logs: LogsInterface) => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useUser();

  if (user === null || user === undefined) {
    return { addRecord: () => null, isLoading, isError, isSuccess };
  }
  const { id, fullName, imageUrl } = user;

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }
    if (isError) {
      setTimeout(() => {
        setIsError(false);
      }, 2000);
    }
  }, [isError, isSuccess]);

  const { firstParamether, secondParamether, operator, result } = logs;
  const addRecord = async () => {
    setIsLoading(true);
    if (firstParamether === 0 && secondParamether === 0 && operator === '÷')
      return setIsError(true);
    if (!firstParamether || !secondParamether || !operator) {
      setIsLoading(false);
      setIsError(true);
      return;
    }
    try {
      if (!id) return;
      await setDoc(doc(db, 'calculations', uuid()), {
        firstParamether,
        operator,
        secondParamether,
        result,
        userId: id,
        createdAt: getTimeStamp(),
        imageUrl,
        fullName,
      });
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsSuccess(true);
      setLogs({
        firstParamether: 0,
        operator: '',
        secondParamether: 0,
        result: 0,
      });
    }
  };

  return { addRecord, isLoading, isError, isSuccess };
};
