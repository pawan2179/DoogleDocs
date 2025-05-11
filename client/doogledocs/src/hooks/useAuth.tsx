import { useContext } from "react"
import { AuthContext } from "../contexts/authContext"
import useLocalStorage from "./useLocalStorage";
import {jwtDecode} from 'jwt-decode';
import Token from "../types/interfaces/token";
import AuthService from "../services/auth-service";

const useAuth = () => {
  const {
    accessToken,
    setAccessToken,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    loadingAuth,
    setLoadingAuth,
    errors,
    setErrors,
    userId,
    setUserId,
    email,
    setEmail
  } = useContext(AuthContext);

  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>("refreshToken", null);
  const logout = async() => {
    if(!accessToken) return ;
    try {
      await AuthService.logout(accessToken);
    } catch (error) {
    } finally {
      destroyAuth();
    }
  }
  const login = (accessToken: string, refreshToken: string) => {
    const {exp, id, email} = jwtDecode<Token>(accessToken);
    silentRefresh(exp);
    setUserId(id);
    setEmail(email);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
  };

  const destroyAuth = () => {
    setRefreshToken(null);
    setEmail(null);
    setUserId(null);
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  const refreshAccessToken = async() => {
    if(refreshToken === null) {
      destroyAuth();
      setLoadingAuth(false);
      return ;
    }
    try {
      const response = await AuthService.refreshToken({token: refreshToken});
      const {accessToken: newAccessToken, refreshToken: newRefreshToken} = response.data;
      login(newAccessToken, newRefreshToken)
    } catch (error) {
      destroyAuth();
    } finally {
      setLoadingAuth(false);
    }
  }

  const silentRefresh = (exp: number) => {
    const expiration = Math.abs(
      new Date().getTime() - new Date(exp*1000).getTime()
    )
    setTimeout(() => {
      refreshAccessToken();
    }, expiration);
  }
  return {
    accessToken,
    isAuthenticated,
    loading,
    loadingAuth,
    errors,
    userId,
    email,
    login,
    logout,
    refreshAccessToken
  }
}

export default useAuth;