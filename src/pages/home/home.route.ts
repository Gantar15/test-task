import { HomePage } from "./HomePage";
import { RouteObject } from "react-router-dom";
import { createElement } from "react";
import { pathKeys } from "@/shared/lib/router";

export const homePageRoute: RouteObject = {
  path: pathKeys.home(),
  element: createElement(HomePage)
};
