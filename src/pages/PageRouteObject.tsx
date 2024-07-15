import { ReactNode } from "react";
import { RouteObject } from "react-router";

declare type PageRouteObject = RouteObject & {
  title?: string;
  icon?: ReactNode;
  children?: PageRouteObject[];
};

export default PageRouteObject;
