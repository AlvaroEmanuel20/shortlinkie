import { ReactNode, createContext, useEffect, useState } from 'react';
import { apiClient } from '../../lib/apiClient';
import { User } from '../../lib/interfaces';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface AuthContext {
  isAuthenticated: boolean;
  user: User | undefined;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = (await apiClient.get<User>('/api/users')).data;
        setUser(res);
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            navigate('/login');
          }
        }

        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) return 'Carregando...';

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
