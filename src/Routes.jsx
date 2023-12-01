import React from "react";
import ErrorBoundry from "./component/ErrorBoundry";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Manager from "./page/Manager";
import Clients from "./page/Clients";
import Projects from "./page/Projects";
import Invoices from "./page/Invoices";
import CustomSnack from "./component/ui/CustomSnack";

const routes = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/manager", Component: Manager },
  { path: "/clients", Component: Clients },
  { path: "/projects", Component: Projects },
  { path: "/invoices", Component: Invoices },
]);
export default function Routes() {
  return (
    <ErrorBoundry>
      <RouterProvider router={routes} fallbackElement="loading" />
      <CustomSnack />
    </ErrorBoundry>
  );
}
