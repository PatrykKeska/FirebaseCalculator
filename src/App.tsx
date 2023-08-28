import { LayoutProvider } from './layouts/LayoutProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CalculatorPage } from './routes/CalculatorPage';
import { LoginPage } from './routes/LoginPage';
import { UsersResoultsPage } from './routes/UsersResultsPage';
import { HomePage } from './routes/HomePage';
import { useAuth } from './hooks/useAuth';
import MyResultsPage from './routes/MyResultsPage';

const AuthProvider = () => {
  useAuth();

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/calculator' element={<CalculatorPage />} />
      <Route path='/users-results' element={<UsersResoultsPage />} />
      <Route path='/my-results' element={<MyResultsPage />} />
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
