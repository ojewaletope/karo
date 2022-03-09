import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from ".";
import { useAuthStatus } from "../hooks";

export const PrivateRoute = () => {
  const { loggedIn, checkStatus } = useAuthStatus();

  if (checkStatus) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};
