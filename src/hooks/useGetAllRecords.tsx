import { query, collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { CalculationSchema } from '../types/dbSchema';
import { useSession } from '../context/sessionContext';

export const useGetAllRecords = () => {
  const [results, setResults] = useState<CalculationSchema[]>([]);
  const { email } = useSession();
  const { session } = useSession();
  const getResults = async () => {
    if (email === '' || !session) return;
    const results: CalculationSchema[] = [];
    const q = query(collection(db, 'calculations'));
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

    const results = await getResults();
    if (!results) return;
    setResults(results.reverse());
  };

  useEffect(() => {
    fetchResults();
  }, [email]);

  return { results };
};
