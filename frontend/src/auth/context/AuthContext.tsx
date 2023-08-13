import { ReactNode, createContext } from 'react';
import useAuth from '../hooks/useAuth';
import useQuery from '../../hooks/useQuery';
import { User } from '../../lib/sharedTypes';

interface AuthContext {
  isAuthenticated: boolean;
  user: {
    userId: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { data: user, isLoading, error } = useQuery<User>('/users');

  if (isLoading) return 'Carregando...';
  if (error || !user) return 'Erro...';

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
