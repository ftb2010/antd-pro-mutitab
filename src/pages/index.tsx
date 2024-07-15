import HomeOutlined from "@ant-design/icons/HomeOutlined";
import React from "react";
import { Navigate } from "react-router";

import pages from "./page";
import PageRouteObject from "./PageRouteObject";
// import WelcomePage from "./welcome";

const routes: PageRouteObject[] = [
  { path: "", element: <Navigate to="main" /> },
  // {
  //   path: "welcome",
  //   title: "欢迎",
  //   icon: <HomeOutlined />,
  //   element: <WelcomePage />,
  // },
  { path: "main", children: pages },
];

export default routes;
