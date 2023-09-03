import { query, collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { CalculationSchema } from '../types/dbSchema';
import { useUser } from '@clerk/clerk-react';

export const useGetAllRecords = () => {
  const [results, setResults] = useState<CalculationSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isSignedIn } = useUser();

  const getResults = async () => {
    setLoading(true);
    try {
      if (!user || !isSignedIn) return;
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
    } catch (error) {
      setLoading(false);
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async () => {
    if (!user?.id) return;

    const results = await getResults();
    if (!results) return;
    setResults(results.reverse());
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return { results, loading };
};
