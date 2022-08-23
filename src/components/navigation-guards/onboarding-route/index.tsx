import { AuthService } from "@services/auth";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  isRegistering: boolean;
};

export const OnboardingRoute: FC<Props> = ({ isRegistering }) => {
  return (
    <>
      {isRegistering ||
      AuthService.getLocalStorage().data.apartment === null ? (
        <Outlet />
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};
