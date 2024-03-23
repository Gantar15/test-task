import { Page404 } from "./Page404";
import { RouteObject } from "react-router-dom";
import { createElement } from "react";
import { pathKeys } from "@/shared/lib/router";

export const page404Route: RouteObject = {
  path: pathKeys.page404(),
  element: createElement(Page404)
};
