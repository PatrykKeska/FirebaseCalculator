import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { LogsInterface } from './useCalculate';
import { db } from '../lib/firebase';
import { useSession } from '../context/sessionContext';
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { getTimeStamp } from '../utils/getTimeStamp';

export const useAddRecordToDatabse = (
  logs: LogsInterface,
  setLogs: (logs: LogsInterface) => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { email, img, name } = useSession();

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
      if (!email) return;
      await setDoc(doc(db, 'calculations', uuid()), {
        firstParamether,
        operator,
        secondParamether,
        result,
        email,
        createdAt: getTimeStamp(),
        id: uuid(),
        img,
        name,
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
