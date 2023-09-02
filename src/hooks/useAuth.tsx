import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSession } from '../context/sessionContext';

export const useAuth = () => {
  const [currLocation, setCurrLocation] = useState<string | null>(null);
  const [isLoaded, setLoaded] = useState(true);
  const { session } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const visitedPageToken = localStorage.getItem('visitedPageToken');

    if (visitedPageToken) {
      setCurrLocation(JSON.parse(visitedPageToken));
    }
  }, []);

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
        localStorage.setItem(
          'visitedPageToken',
          JSON.stringify(location.pathname)
        );
      }
    }
  }, []);
};
