import { createBrowserRouter } from "react-router-dom";
import DetailTemplate from "../pages/template-detail";
import TemplateSelectorPage from "../pages/template-selector";
import NotFoundPage from "../pages/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TemplateSelectorPage />,
  },
  {
    path: "/template/:id",
    element: <DetailTemplate />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
