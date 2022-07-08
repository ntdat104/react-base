import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  children: React.ReactNode;
}

const AllRoute: React.FC<Props> = (props) => {
  const { children, ...rest } = props;

  return <Route {...rest} children={children} />;
};

export default AllRoute;
