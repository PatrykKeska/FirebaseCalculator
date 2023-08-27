import { LayoutProvider } from './layouts/LayoutProvider';
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { CalculatorPage } from './routes/CalculatorPage';
import { LoginPage } from './routes/LoginPage';
import { useEffect, useState } from 'react';
import { useSession } from './context/sessionContext';
import { UsersResoultsPage } from './routes/UsersResultsPage';
import { HomePage } from './routes/HomePage';
import { LoadingBatch } from './components/LoadingBatch';

const AuthProvider = () => {
  const [currLocation, setCurrLocation] = useState<string | null>(null);
  const [isLoaded, setLoaded] = useState(true);
  const { session } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currPage = localStorage.getItem('currPage');
    if (currPage) {
      setCurrLocation(JSON.parse(currPage));
    }
  });

  useEffect(() => {
    if (!session && window.location.pathname !== '/login') {
      navigate('/');
    }
    if (session) {
      if (currLocation) {
        if (isLoaded) {
          setLoaded(false);
          navigate(currLocation);
        }
        localStorage.setItem('currPage', JSON.stringify(location.pathname));
      }
    }
  }, [session, navigate, location.pathname, currLocation]);

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/calculator' element={<CalculatorPage />} />
      <Route path='/users-results' element={<UsersResoultsPage />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <AuthProvider />
      </LayoutProvider>
    </BrowserRouter>
  );
}
export default App;
