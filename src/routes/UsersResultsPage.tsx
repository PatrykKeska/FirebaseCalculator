import { LoadingBatch } from '../components/LoadingBatch';
import { ResultCard } from '../components/ResultCard';
import { useGetAllRecords } from '../hooks/useGetAllRecords';
import { LayoutProvider } from '../layouts/LayoutProvider';

export const UsersResoultsPage = () => {
  const { results, loading } = useGetAllRecords();

  return (
    <LayoutProvider>
      <section className='flex flex-row flex-wrap items-center justify-center gap-5 py-10'>
        {loading && <LoadingBatch />}
        {results.map((result) => (
          <ResultCard key={result.id} noDelete cardDetails={{ ...result }} />
        ))}
      </section>
    </LayoutProvider>
  );
};
