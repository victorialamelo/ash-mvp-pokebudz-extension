// hooks/usePokemonFetch.js
import { useState, useEffect } from 'react';

export function usePokemonFetch(endpoint, param, enabled = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!param || !enabled) return;

    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(`api/pokemon/${endpoint}/${param}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch from ${endpoint}: ${response.status}`);
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Error in ${endpoint} fetch:`, err);
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, param, enabled]);

  return { data, loading, error };
}
