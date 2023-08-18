import { useState } from 'react';
import { ApiError } from '../lib/interfaces';
import { apiClient } from '../lib/apiClient';
import { AxiosError } from 'axios';

export default function useMutation(
  url: string,
  method: 'post' | 'delete' | 'patch'
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError>();

  const mutate = async <T, K>(data?: T) => {
    setIsLoading(true);

    try {
      const res = (await apiClient<K>({ method, url, data })).data;
      setIsLoading(false);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        setError({
          statusCode: error.response?.data.statusCode,
          message: error.response?.data.message,
          context: error.response?.data.context,
        });
      }

      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}
