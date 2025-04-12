import { useState, useEffect } from 'react';
import { fetchClient } from '../../api/fetchClient';

export const useFetchData = <T>(endpoint: string | null) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!endpoint) {
      setData(null);
      setIsLoading(false);
      setError(null);

      return;
    }

    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchClient.getData<T>(endpoint);

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error('An unknown error occurred'),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, isLoading, error };
};
