import { LoadingBatch } from '../components/LoadingBatch';
import { ResultCard } from '../components/ResultCard';
import { useGetUserRecord } from '../hooks/useGetUserRecord';

const MyResultsPage = () => {
  const { results, loading } = useGetUserRecord();

  return (
    <section className='flex flex-row flex-wrap items-center justify-center gap-5 py-10'>
      {loading && <LoadingBatch />}
      {results.map((result: any) => (
        <ResultCard key={result.id} cardDetails={{ ...result }} />
      ))}
    </section>
  );
};

export default MyResultsPage;
