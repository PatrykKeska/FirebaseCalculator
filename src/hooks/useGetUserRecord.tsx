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
import { useSession } from '../context/sessionContext';

export const useGetUserRecord = () => {
  const [results, setResults] = useState<CalculationSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const { email } = useSession();

  const getResults = async (email: string) => {
    setLoading(true);
    try {
      const results: CalculationSchema[] = [];
      const q = query(
        collection(db, 'calculations'),
        where('email', '==', email)
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
    if (!email) return;

    const results = await getResults(email);
    setResults(results.reverse());
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (recordId: string) => {
    await deleteDoc(doc(db, 'calculations', recordId));
  };

  return { results, handleDelete, loading };
};
