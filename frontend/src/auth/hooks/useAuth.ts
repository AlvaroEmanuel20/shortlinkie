import { useState } from 'react';
import { apiClient } from '../../lib/apiClient';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData extends LoginData {
  name: string;
}

export default function useAuth() {
  const navigate = useNavigate();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);

  const signUp = async (data: SignUpData) => {
    setLoadingSignUp(true);

    try {
      const { userId } = (
        await apiClient.post<{ userId: string }>('/users', data)
      ).data;

      setLoadingSignUp(false);
      navigate('/login');
      return userId;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 409) toast.error('Email já cadastrado');
        if (error.response.status === 500)
          toast.error('Erro interno no servidor');
      }

      setLoadingSignUp(false);
    }
  };

  const login = async (data: LoginData) => {
    setLoadingLogin(true);

    try {
      const { userId } = (
        await apiClient.post<{ userId: string }>('/api/auth/login', data)
      ).data;

      setLoadingLogin(false);
      navigate('/');
      return userId;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) toast.error('Senha inválida');
        if (error.response.status === 404)
          toast.error('Usuário não encontrada');
        if (error.response.status === 500)
          toast.error('Erro interno no servidor');
      }

      setLoadingLogin(false);
    }
  };

  const logout = async () => {
    setLoadingLogout(true);

    try {
      const { success } = (
        await apiClient.post<{ success: boolean }>('/api/auth/logout')
      ).data;

      setLoadingLogout(false);
      navigate('/login');
      return success;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 500)
          toast.error('Erro interno no servidor');
      }

      setLoadingLogout(false);
    }
  };

  return {
    login,
    loadingLogin,
    logout,
    loadingLogout,
    signUp,
    loadingSignUp,
  };
}
