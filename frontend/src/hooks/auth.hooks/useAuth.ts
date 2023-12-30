import { useState } from 'react';
import { apiClient } from '../../lib/apiClient';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserId } from '../../lib/types';

export interface ResetPassData {
  email: string;
}

export interface NewPassData {
  newPassword: string;
  confirmPassword: string;
}

export interface LoginData extends ResetPassData {
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
  const [loadingResetPass, setLoadingResetPass] = useState(false);
  const [loadingNewPass, setLoadingNewPass] = useState(false);

  const signUp = async (data: SignUpData) => {
    setLoadingSignUp(true);

    try {
      const { userId } = (await apiClient.post<UserId>('/api/users', data)).data;
      setLoadingSignUp(false);
      navigate('/entrar');
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
      const { userId } = (await apiClient.post<UserId>('/api/auth/login', data))
        .data;
      setLoadingLogin(false);
      navigate('/');
      return userId;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) toast.error('Senha inválida');
        if (error.response.status === 404)
          toast.error('Usuário não encontrado');
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
      navigate('/entrar');
      return success;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 500)
          toast.error('Erro interno no servidor');
      }

      setLoadingLogout(false);
    }
  };

  const resetPass = async (data: ResetPassData) => {
    setLoadingResetPass(true);

    try {
      const { userId } = (
        await apiClient.post<UserId>('/api/users/resetpass', data)
      ).data;

      setLoadingResetPass(false);
      return userId;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 404)
          toast.error('Usuário não encontrado');
        if (error.response.status === 500)
          toast.error('Erro interno no servidor');
      }

      setLoadingResetPass(false);
    }
  };

  const newPass = async (data: NewPassData, token: string) => {
    setLoadingNewPass(true);

    try {
      const { userId } = (
        await apiClient.put<UserId>(`/api/users/resetpass?token=${token}`, data)
      ).data;

      setLoadingNewPass(false);
      navigate('/entrar');
      return userId;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 403)
          toast.error('Acesso negado (Token inválido ou expirado)');
        if (error.response.status === 500)
          toast.error('Erro interno no servidor');
      }

      setLoadingNewPass(false);
    }
  };

  return {
    login,
    loadingLogin,
    logout,
    loadingLogout,
    signUp,
    loadingSignUp,
    resetPass,
    loadingResetPass,
    newPass,
    loadingNewPass,
  };
}
