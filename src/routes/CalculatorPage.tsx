import { useUser } from '@clerk/clerk-react';
import { CalculatorLayout } from '../layouts/CalculatorLayout';
import { LayoutProvider } from '../layouts/LayoutProvider';
import { LoadingBatch } from '../components/LoadingBatch';

export const CalculatorPage = () => {
  const { isLoaded } = useUser();

  return (
    <LayoutProvider>
      {!isLoaded && <LoadingBatch />}
      <CalculatorLayout />
    </LayoutProvider>
  );
};
