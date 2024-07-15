import React from "react";
import { Navigate } from "react-router";
import { HomeOutlined, SettingOutlined, SmileOutlined } from "@ant-design/icons";

import PageRouteObject from "../PageRouteObject";

import Home from "./home";
import Welcome from "./welcome";
import Setting from "./setting";


const routes: PageRouteObject[] = [
  { path: "", element: <Navigate to="welcome" /> },
  { path: "welcome", title: "欢迎", element: <Welcome />, icon: <SmileOutlined /> },
  { path: "setting", title: "设置", element: <Setting />, icon: <SettingOutlined /> },
  { path: "home", title: "首页", element: <Home />, icon: <HomeOutlined /> },
];

export default routes;
