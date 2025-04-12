import { useState, useEffect } from 'react';

export const useLoading = (timeoutDuration: number): boolean => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, timeoutDuration);

    return () => clearTimeout(timer);
  }, [timeoutDuration]);

  return isLoading;
};
