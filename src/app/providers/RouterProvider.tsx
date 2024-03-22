import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  useRouteError,
} from "react-router-dom";

import { BaseLayout } from "@/pages/Layouts";
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
        children: [homePageRoute],
      },
      {
        loader: async () => redirect(pathKeys.page404),
        path: "*",
      },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
