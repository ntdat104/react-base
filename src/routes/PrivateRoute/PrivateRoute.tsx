import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = (props) => {
  const { children, ...rest } = props;

  return (
    <Route
      {...rest}
      render={({ location }) => {
        const idToken = localStorage.getItem('idToken');

        if (!idToken) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          );
        }

        return children;
      }}
    />
  );
};

export default PrivateRoute;
