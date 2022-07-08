import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

// components
import Loading from 'components/Loading';

// pages
const HomePage = React.lazy(() => import('pages/HomePage'));
const AboutPage = React.lazy(() => import('pages/AboutPage'));
const UserPage = React.lazy(() => import('pages/UserPage'));

// all-routes
const allRoutes = [
  {
    path: '/all-route-1',
    component: () => <h1>{`all-route-1`}</h1>,
    Fallback: Loading,
    exact: true,
  },
  {
    path: '/all-route-2',
    component: () => <h1>{`all-route-2`}</h1>,
    Fallback: Loading,
    exact: true,
  },
  {
    path: '/all-route-3',
    component: () => <h1>{`all-route-3`}</h1>,
    Fallback: Loading,
    exact: true,
  },
];

// public-routes
const publicRoutes = [
  {
    path: '/',
    component: HomePage,
    Fallback: Loading,
    exact: true,
  },
  {
    path: '/about',
    component: AboutPage,
  },
  {
    path: '/users',
    component: UserPage,
  },
];

// private-routes
const privateRoutes = [
  {
    path: '/private',
    component: () => <h1>{`Private`}</h1>,
    Fallback: Loading,
    exact: true,
  },
];

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to={'/'}>{`Home`}</Link>
        <Link to={'/about'}>{`About`}</Link>
        <Link to={'/users'}>{`User`}</Link>
      </div>
      {allRoutes.map(
        (
          { path, component: Component, Fallback = Loading, exact = true },
          key: number
        ) => (
          <Switch key={`all-route-${key}`}>
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
      {publicRoutes.map(
        (
          { path, component: Component, Fallback = Loading, exact = true },
          key: number
        ) => (
          <Switch key={`public-route-${key}`}>
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
        (
          { path, component: Component, Fallback = Loading, exact = true },
          key: number
        ) => (
          <Switch key={`private-route-${key}`}>
            <Route
              path={path}
              exact={exact}
              render={() => {
                const idToken = localStorage.getItem('idToken');

                if (!idToken) return <Redirect to={'/home'} />;

                return (
                  <React.Suspense fallback={<Fallback />}>
                    <Component />
                  </React.Suspense>
                );
              }}
            />
          </Switch>
        )
      )}
    </BrowserRouter>
  );
};

export default Routes;
