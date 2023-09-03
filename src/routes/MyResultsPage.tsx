import { LoadingBatch } from '../components/LoadingBatch';
import { ResultCard } from '../components/ResultCard';
import { useGetUserRecord } from '../hooks/useGetUserRecord';
import { LayoutProvider } from '../layouts/LayoutProvider';

const MyResultsPage = () => {
  const { results, loading } = useGetUserRecord();
  if (!results) return null;
  return (
    <LayoutProvider>
      <section className='flex flex-row flex-wrap items-center justify-center gap-5 py-10'>
        {loading && <LoadingBatch />}
        {results.length === 0 && (
          <section className='flex flex-col items-center justify-center'>
            <h1 className='text-center text-2xl font-bold'>
              You don't have any records yet...
            </h1>
            <h2>try to calculate something!</h2>
          </section>
        )}
        {results.map((result: any) => (
          <ResultCard key={result.id} cardDetails={{ ...result }} />
        ))}
      </section>
    </LayoutProvider>
  );
};

export default MyResultsPage;
