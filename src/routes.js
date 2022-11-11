import React from "react";
import { Redirect } from "react-router-dom";

const HOME = "/";
const DAPP = "dapp/";

export const ROUTES_PATHS = {
  HOME,
  PAGE_1: `${HOME}page-1`,
  PAGE_2: `${HOME}page-2`,
  DAPP_BASE: `${HOME}${DAPP}`,
  DAPP_HOME: `${HOME}${DAPP}pre-sale`,
};

export const appRoutes = [
  {
    exact: true,
    path: ROUTES_PATHS.HOME,
    component: () => {
      return <Redirect to={ROUTES_PATHS.DAPP_HOME} />;
    },
  },
  /*
         dapp it's better to render home in a route other than / to make use of layouts
         layout will not rerender on route change
         of course if you use anything other than hashrouter you will have to adjust your server
         to serve the index.html file for all routes
     */
  {
    path: ROUTES_PATHS.DAPP_BASE,
    layout: React.lazy(() => import("./layouts/MainLayout")),
    routes: [
      {
        path: ROUTES_PATHS.DAPP_HOME,
        exact: true,
        component: React.lazy(() => import("./pages/Home")),
      },
    ],
  },
];
