// import { useQuery } from '@tanstack/react-query';
// import { http } from '@/api/http';

// export function useNominalRoll() {
//   return useQuery({
//     queryKey: ['staff'],
//     queryFn: () => http.get('/staff/').then((r) => r.data),
//   });
// }

import { useEffect, useState } from 'react';
import axios from 'axios';

export const useNominalRoll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNominalRoll = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/nominal-roll/');
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNominalRoll();
  }, []);

  return { data, isLoading, error };
};
