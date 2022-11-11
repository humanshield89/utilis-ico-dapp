import { Route, Switch } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import { Suspense, Fragment } from "react";

/**
 * @param routes[{path, component, exact, layout, routes, gard}]
 * @returns {JSX.Element}
 * @constructor
 */
export const renderRoutes = ({ routes = [] }) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes({ routes: route.routes })
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
};

export default renderRoutes;
