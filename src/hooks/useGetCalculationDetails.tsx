import { getDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { CalculationSchema } from '../types/dbSchema';

const getDocument = async (id: string): Promise<CalculationSchema | null> => {
  const docRef = doc(db, 'calculations', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const docData = {
      ...(docSnap.data() as CalculationSchema),
      id: docSnap.id,
    };
    return docData;
  } else {
    return null;
  }
};

export const useGetCalculationDetails = (id: string) => {
  const [results, setResults] = useState<CalculationSchema | null>(null);
  useEffect(() => {
    (async () => {
      const response = await getDocument(id);
      setResults(response);
    })();
  }, []);

  return { results };
};
