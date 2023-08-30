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
  const { email } = useSession();

  const getResults = async (email: string) => {
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
  };

  const fetchResults = async () => {
    if (!email) return;

    const results = await getResults(email);
    setResults(results.reverse());
  };

  useEffect(() => {
    fetchResults();
  }, [email, results]);

  const handleDelete = async (recordId: string) => {
    await deleteDoc(doc(db, 'calculations', recordId));
  };

  return { results, handleDelete };
};
