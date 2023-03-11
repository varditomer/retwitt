import { Route, Navigate } from 'react-router-dom'

type PrivateRouteProps = {
  isAuthenticated: boolean
  redirectTo: string
  element: React.ReactElement
  path: string
  [key: string]: any
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  redirectTo,
  element: Element,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          Element
        ) : (
          <Navigate to={redirectTo} replace={true} />
        )
      }
    />
  )
}
