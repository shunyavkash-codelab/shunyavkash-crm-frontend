import React from "react";
import ErrorBoundry from "./component/ErrorBoundry";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import CustomSnack from "./component/ui/CustomSnack";

const routes = createBrowserRouter([{ path: "/", Component: Home }]);
export default function Routes() {
  return (
    <ErrorBoundry>
      <RouterProvider router={routes} fallbackElement="loading" />
      <CustomSnack />
    </ErrorBoundry>
  );
}
