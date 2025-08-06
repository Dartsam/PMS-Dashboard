git addimport { useEffect, useState } from 'react';
import axios from 'axios';

export const useNominalRoll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNominalRoll = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/nom_roll/employee');
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
