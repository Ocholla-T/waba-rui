import { AuthService } from "@services/auth";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {};
export const ProtectedRoute: FC<Props> = ({}) => {
  const isAuthenticated = AuthService.isAuthenticated();

  return (
    <>{isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />}</>
  );
};
