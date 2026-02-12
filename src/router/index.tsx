/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingPage } from "../components/Loading";

const TemplateSelectorPage = lazy(() => import("../pages/template-selector"));
const DetailTemplate = lazy(() => import("../pages/template-detail"));
const NotFoundPage = lazy(() => import("../pages/not-found"));

const withSuspense = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<LoadingPage />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(TemplateSelectorPage),
  },
  {
    path: "/template/:id",
    element: withSuspense(DetailTemplate),
  },
  {
    path: "*",
    element: withSuspense(NotFoundPage),
  },
]);

export default router;
