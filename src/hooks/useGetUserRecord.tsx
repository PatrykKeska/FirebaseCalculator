import { query, collection, where, getDocs } from 'firebase/firestore';
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
      results.push(doc.data() as CalculationSchema);
    });
    return results;
  };

  console.log(results);

  useEffect(() => {
    if (!email) return;
    (async () => {
      const results = await getResults(email);
      setResults(results.reverse());
    })();

    return () => setResults([]);
  }, []);

  return { results };
};
