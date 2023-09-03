// import { useEffect, useMemo, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useSession } from '../context/sessionContext';

// export const useAuth = () => {
//   const [currLocation, setCurrLocation] = useState<string | null>(null);
//   const [isLoaded, setLoaded] = useState<boolean>(true);
//   const { session } = useSession();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     console.log('1');
//     if (!session) {
//       localStorage.removeItem('visitedPageToken');
//     }
//     if (!session && location.pathname !== '/login') {
//       localStorage.setItem('visitedPageToken', JSON.stringify('/'));
//       navigate('/');
//     }
//   }, []);

//   useEffect(() => {
//     console.log('2');

//     if (isLoaded && session) {
//       setLoaded(false);
//     } else {
//       const token = localStorage.getItem('visitedPageToken ');
//       if (token) {
//         setCurrLocation(token);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     console.log('3');

//     const token = localStorage.getItem('visitedPageToken ');
//     if (token) {
//       setCurrLocation(token);
//     } else {
//       localStorage.setItem(
//         'visitedPageToken',
//         JSON.stringify(location.pathname)
//       );
//       setCurrLocation(location.pathname);
//     }
//   }, [location.pathname]);
// };
