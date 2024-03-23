import { BaseLayout, EmptyLayout } from "@/pages/layouts";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  useRouteError
} from "react-router-dom";

import { homePageRoute } from "@/pages/home";
import { page404Route } from "@/pages/page404";
import { pathKeys } from "@/shared/lib/router";

const BubbleError = (): null => {
  const error = useRouteError();
  if (error) throw error;
  return null;
};

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <BaseLayout />,
        children: [homePageRoute]
      },
      {
        element: <EmptyLayout />,
        children: [page404Route]
      },
      {
        path: "*",
        loader: () => redirect(pathKeys.page404())
      }
    ]
  }
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
