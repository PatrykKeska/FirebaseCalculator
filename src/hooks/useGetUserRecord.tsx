import {
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { CalculationSchema } from '../types/dbSchema';
import { useUser } from '@clerk/clerk-react';

type GetUserRecordResult = {
  results: CalculationSchema[] | undefined;
  handleDelete: (recordId: string) => Promise<void> | undefined;
  loading: boolean;
};

export const useGetUserRecord = (): GetUserRecordResult => {
  const [results, setResults] = useState<CalculationSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  if (user === null || user === undefined) return {} as GetUserRecordResult;
  const { id: userId } = user;

  const getResults = async (userId: string) => {
    setLoading(true);
    try {
      const results: CalculationSchema[] = [];
      const q = query(
        collection(db, 'calculations'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docObject = {
          ...doc.data(),
          id: doc.id,
        };

        results.push(docObject as CalculationSchema);
      });
      return results;
    } catch (error) {
      setLoading(false);
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async () => {
    if (!userId) return;

    const results = await getResults(userId);
    setResults(results.reverse());
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (recordId: string) => {
    await deleteDoc(doc(db, 'calculations', recordId));
  };

  if (user === null || user === undefined) return {} as GetUserRecordResult;

  return { results, handleDelete, loading };
};
