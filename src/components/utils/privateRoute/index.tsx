import { AuthService } from '@services/auth'
import { FC, ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

type protectedRouteProps = {}

export const PrivateRoute: FC<protectedRouteProps> = ({}: protectedRouteProps): ReactElement => {
  return AuthService.isAuthenticated() ? <Outlet /> : <Navigate to="auth/login" />
}
