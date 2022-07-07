import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// components
import Loading from 'components/Loading';

// pages
const HomePage = React.lazy(() => import('pages/HomePage'));
const AboutPage = React.lazy(() => import('pages/AboutPage'));
const UserPage = React.lazy(() => import('pages/UserPage'));

const publicRoutes = [
  {
    path: '/',
    Component: HomePage,
    Fallback: Loading,
    exact: true,
  },
  {
    path: '/about',
    Component: AboutPage,
  },
  {
    path: '/users',
    Component: UserPage,
  },
];

const privateRoutes = [
  {
    path: '/private',
    Component: () => <h1>{`Private`}</h1>,
    Fallback: Loading,
    exact: true,
  },
];

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      {publicRoutes.map(
        ({ path, Component, Fallback = Loading, exact = true }) => (
          <Switch>
            <Route
              path={path}
              exact={exact}
              render={() => (
                <React.Suspense fallback={<Fallback />}>
                  <Component />
                </React.Suspense>
              )}
            />
          </Switch>
        )
      )}
      {privateRoutes.map(
        ({ path, Component, Fallback = Loading, exact = true }) => (
          <Switch>
            <Route
              path={path}
              exact={exact}
              render={() => (
                <React.Suspense fallback={<Fallback />}>
                  <Component />
                </React.Suspense>
              )}
            />
          </Switch>
        )
      )}
    </BrowserRouter>
  );
};

export default Routes;
