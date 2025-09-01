import { useEffect, useState } from 'react';
import axios from 'axios';
export const useNominalRoll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNominalRoll = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/nom_roll/nominal/');
        setData(response.data.results || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNominalRoll();
  }, []);

  return { data, isLoading, error };
};
