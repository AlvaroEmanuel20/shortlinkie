import { useState } from 'react';
import { apiClient } from '../../lib/apiClient';
import { AxiosError } from 'axios';
import { ApiError } from '../../lib/sharedTypes';
import { useNavigate } from 'react-router-dom';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData extends LoginData {
  name: string;
}

export default function useAuth() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loginError, setLoginError] = useState<ApiError>();
  const [logoutError, setLogoutError] = useState<ApiError>();
  const [signUpError, setSignUpError] = useState<ApiError>();

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
        setSignUpError({
          statusCode: error.response.status,
          message: error.response.data.message,
        });
      }

      setLoadingSignUp(false);
    }
  };

  const login = async (data: LoginData) => {
    setLoadingLogin(true);

    try {
      const { userId } = (
        await apiClient.post<{ userId: string }>('/auth/login', data)
      ).data;

      setIsAuthenticated(true);
      setLoadingLogin(false);
      navigate('/');
      return userId;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setLoginError({
          statusCode: error.response.status,
          message: error.response.data.message,
        });
      }

      setLoadingLogin(false);
    }
  };

  const logout = async () => {
    setLoadingLogout(true);

    try {
      const { success } = (
        await apiClient.post<{ success: boolean }>('/auth/logout')
      ).data;

      setIsAuthenticated(false);
      setLoadingLogout(false);
      navigate('/login');
      return success;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setLogoutError({
          statusCode: error.response.status,
          message: error.response.data.message,
        });
      }

      setLoadingLogout(false);
    }
  };

  return {
    isAuthenticated,
    loginError,
    login,
    loadingLogin,
    logout,
    loadingLogout,
    logoutError,
    signUp,
    loadingSignUp,
    signUpError,
  };
}
