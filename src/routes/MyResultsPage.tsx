import { ResultCard } from '../components/ResultCard';
import { useGetUserRecord } from '../hooks/useGetUserRecord';

const MyResultsPage = () => {
  const { results } = useGetUserRecord();

  return (
    <section className='flex flex-row flex-wrap items-center justify-center gap-5 py-10'>
      {results.map((result) => (
        <ResultCard key={result.id} {...result} />
      ))}
    </section>
  );
};

export default MyResultsPage;
