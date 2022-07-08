import React from 'react';
import { BrowserRouter, Switch, Link, Route, Redirect } from 'react-router-dom';

// components
import Loading from 'components/Loading';
import AllRoute from './AllRoute';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { UrlInternal } from 'constants/url-internal';

// pages
const HomePage = React.lazy(() => import('pages/HomePage'));
const AboutPage = React.lazy(() => import('pages/AboutPage'));
const UserPage = React.lazy(() => import('pages/UserPage'));

// all-routes
const allRoutes = [
  {
    path: UrlInternal.NOT_FOUND,
    component: () => <h1>{`not-found`}</h1>,
    Fallback: Loading,
    exact: true,
  },
  {
    path: UrlInternal.LOGIN,
    component: () => <h1>{`login`}</h1>,
    Fallback: Loading,
    exact: true,
  },
  {
    path: UrlInternal.HOME,
    component: () => <h1>{`home`}</h1>,
    Fallback: Loading,
    exact: true,
  },
  {
    path: UrlInternal.ALL_ROUTE_1,
    component: () => <h1>{`all-route-1`}</h1>,
    Fallback: Loading,
    exact: true,
  },
  {
    path: UrlInternal.ALL_ROUTE_2,
    component: () => <h1>{`all-route-2`}</h1>,
    Fallback: Loading,
    exact: true,
  },
  {
    path: UrlInternal.ALL_ROUTE_3,
    component: () => <h1>{`all-route-3`}</h1>,
    Fallback: Loading,
    exact: true,
  },
];

// public-routes
const publicRoutes = [
  {
    path: UrlInternal.PUBLIC_ROUTE_1,
    component: HomePage,
    Fallback: Loading,
    exact: true,
  },
  {
    path: UrlInternal.PUBLIC_ROUTE_2,
    component: AboutPage,
    Fallback: Loading,
  },
  {
    path: UrlInternal.PUBLIC_ROUTE_3,
    component: UserPage,
    Fallback: Loading,
  },
];

// private-routes
const privateRoutes = [
  {
    path: UrlInternal.PRIVATE_ROUTE_1,
    component: () => <h1>{`private-route-1`}</h1>,
    Fallback: Loading,
    exact: true,
  },
  {
    path: UrlInternal.PRIVATE_ROUTE_2,
    component: () => <h1>{`private-route-2`}</h1>,
    Fallback: Loading,
    exact: true,
  },
  {
    path: UrlInternal.PRIVATE_ROUTE_3,
    component: () => <h1>{`private-route-3`}</h1>,
    Fallback: Loading,
    exact: true,
  },
];

const Routes: React.FC = () => {
  const handleLogin = () => {
    localStorage.setItem('idToken', '123');
  };

  const handleLogout = () => {
    localStorage.removeItem('idToken');
  };

  return (
    <BrowserRouter>
      <div>
        <button onClick={handleLogin}>{`Login`}</button>
        <button onClick={handleLogout}>{`Logout`}</button>
        <h1>{`All routes`}</h1>
        {allRoutes.map(({ path }, index: number) => (
          <Link to={path} key={index}>{`${path}`}</Link>
        ))}
      </div>
      <div>
        <h1>{`Public routes`}</h1>
        {publicRoutes.map(({ path }, index: number) => (
          <Link to={path} key={index}>{`${path}`}</Link>
        ))}
      </div>
      <div>
        <h1>{`Private routes`}</h1>
        {privateRoutes.map(({ path }, index: number) => (
          <Link to={path} key={index}>{`${path}`}</Link>
        ))}
      </div>
      <Switch>
        {allRoutes.map(
          (
            { path, component: Component, Fallback = Loading, exact = true },
            key: number
          ) => (
            <AllRoute path={path} exact={exact} key={key}>
              <React.Suspense fallback={<Fallback />}>
                <Component />
              </React.Suspense>
            </AllRoute>
          )
        )}
        {publicRoutes.map(
          (
            { path, component: Component, Fallback = Loading, exact = true },
            key: number
          ) => (
            <PublicRoute path={path} exact={exact} key={key}>
              <React.Suspense fallback={<Fallback />}>
                <Component />
              </React.Suspense>
            </PublicRoute>
          )
        )}
        {privateRoutes.map(
          (
            { path, component: Component, Fallback = Loading, exact = true },
            key: number
          ) => (
            <PrivateRoute path={path} exact={exact} key={key}>
              <React.Suspense fallback={<Fallback />}>
                <Component />
              </React.Suspense>
            </PrivateRoute>
          )
        )}
        <Route
          path={`*`}
          render={({ location, match }) => {
            const isMatch = Object.values(UrlInternal).includes(
              match.url as UrlInternal
            );

            if (!isMatch) {
              return (
                <Redirect
                  to={{
                    pathname: UrlInternal.NOT_FOUND,
                    state: { from: location },
                  }}
                />
              );
            }
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
