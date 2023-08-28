import { useSession } from '../context/sessionContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const UsersResoultsPage = () => {
  const { email } = useSession();
  const check = async () => {
    const q = query(
      collection(db, 'calculations'),
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  };
  return (
    <>
      <h1>users resoults</h1>
      <button onClick={check}>check</button>
    </>
  );
};
