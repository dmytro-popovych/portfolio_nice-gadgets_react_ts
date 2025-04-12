import { BASE_URL } from '../utils/constants';

export const fetchClient = {
  async getData<T>(endpoint: string): Promise<T> {
    const url = `${BASE_URL}/${endpoint}.json`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Error fetching data: ${response.status} ${response.statusText}`,
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Could not retrieve data. Please try again later.');
      }
    }
  },
};
