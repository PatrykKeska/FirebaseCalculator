import { ResultCard } from '../components/ResultCard';
import { useGetAllRecords } from '../hooks/useGetAllRecords';

export const UsersResoultsPage = () => {
  const { results } = useGetAllRecords();

  return (
    <>
      <section className='flex flex-row flex-wrap items-center justify-center gap-5 py-10'>
        {results.map((result) => (
          <ResultCard key={result.id} noDelete cardDetails={{ ...result }} />
        ))}
      </section>
    </>
  );
};
