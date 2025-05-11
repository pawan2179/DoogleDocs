import { JSX, useEffect } from "react"
import useAuth from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
  element: JSX.Element;
}

const AuthRoute = ({element}: AuthRouteProps) => {
  const {loadingAuth, isAuthenticated, refreshAccessToken} = useAuth();

  useEffect(() => {
    refreshAccessToken();
  }, []);

  if(loadingAuth) return <></>;
  if(isAuthenticated) return element;
  return <Navigate to={'/login'} />;
}

export default AuthRoute;