import React, { FC } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import pages from "./pages";

const router = createHashRouter([
  { path: "", element: <AppLayout />, children: pages },
]);

const App: FC = function () {
  return <RouterProvider router={router} />;
};

export default App;
