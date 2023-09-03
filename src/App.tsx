import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { CalculatorPage } from './routes/CalculatorPage';
import { UsersResoultsPage } from './routes/UsersResultsPage';
import { HomePage } from './routes/HomePage';
import MyResultsPage from './routes/MyResultsPage';
import CalculationDetailsPage from './routes/CalculationDetails';
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
} from '@clerk/clerk-react';

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/sign-in/*'
          element={<SignIn routing='path' path='/sign-in' />}
        />
        <Route
          path='/sign-up/*'
          element={<SignUp routing='path' path='/sign-up' />}
        />

        <Route
          path='/calculator'
          element={
            <>
              <SignedIn>
                <CalculatorPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path='/my-results'
          element={
            <>
              <SignedIn>
                <MyResultsPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path='/my-results/:id'
          element={
            <>
              <SignedIn>
                <CalculationDetailsPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path='/users-results'
          element={
            <>
              <SignedIn>
                <UsersResoultsPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path='/users-results/:id'
          element={
            <>
              <SignedIn>
                <CalculationDetailsPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}

export default App;
