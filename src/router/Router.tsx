import { lazy } from "react";
import { useRoutes, type RouteObject } from "react-router";
import Layout from "@/layout/Layout";
const Overview = lazy(() => import("@/pages/overview/Overview"));

const CatchAllRoutes = () => {
  return <div>Catch all route</div>;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/overview",
        element: <Overview />,
      },
      {
        path: "*",
        element: <CatchAllRoutes />,
      },
    ],
  },
];

const Router = () => {
  const element = useRoutes(routes);
  return element;
};
export default Router;
