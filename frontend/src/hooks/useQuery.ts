import { useEffect, useState } from 'react';
import { ApiError } from '../lib/types';
import { AxiosError } from 'axios';
import { apiClient } from '../lib/apiClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function useQuery<T>(
  url: string,
  onError?: (error: ApiError | undefined) => void
) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError>();
  const navigate = useNavigate();

  const [fetchs, setFetchs] = useState(0);
  const refetch = () => setFetchs(fetchs + 1);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = (await apiClient.get<T>(url)).data;

        setData(res);
        setIsLoading(false);
        return res;
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          if (error.response.status === 401) {
            toast.info('Sua sessão expirou, faça login.');
            navigate('/login');
          }

          if (onError) {
            onError({
              statusCode: error.response?.data.statusCode,
              message: error.response?.data.message,
              context: error.response?.data.context,
            });
          }

          setError({
            statusCode: error.response.status,
            message: error.response.data.message,
            context: error.response.data.context,
          });
        }

        setIsLoading(false);
      }
    };

    fetch();
  }, [url, fetchs]);

  return { data, isLoading, error, refetch };
}
