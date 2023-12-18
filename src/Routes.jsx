import React from "react";
import ErrorBoundry from "./component/ErrorBoundry";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CustomSnack from "./component/ui/CustomSnack";
import SignUp from "./page/SignUp";
import SignIn from "./page/SignIn";
import ForgotPassword from "./page/ForgotPassword";
import ConfirmPassword from "./page/ConfirmPassword";
import Home from "./page/Home";
import Manager from "./page/Manager";
import AddManager from "./page/AddManager";
import Clients from "./page/Clients";
import AddClient from "./page/AddClient";
import Projects from "./page/Projects";
import AddProject from "./page/AddProject";
import Invoices from "./page/Invoices";
import AddInvoice from "./page/AddInvoice";
import PreviewInvoice from "./page/PreviewInvoice";
import Profile from "./page/Profile";

const routes = createBrowserRouter([
  { path: "/signup", Component: SignUp },
  { path: "/signin", Component: SignIn },
  { path: "/forgot-password", Component: ForgotPassword },
  { path: "/confirm-password", Component: ConfirmPassword },
  { path: "/", Component: Home },
  { path: "/managers", Component: Manager },
  { path: "/managers/add", Component: AddManager },
  { path: "/clients", Component: Clients },
  { path: "/Clients/add", Component: AddClient },
  { path: "/Clients/edit/:id", Component: AddClient },
  { path: "/projects", Component: Projects },
  { path: "/Projects/add", Component: AddProject },
  { path: "/invoices", Component: Invoices },
  { path: "/invoices/add", Component: AddInvoice },
  { path: "/invoices/add/preview", Component: PreviewInvoice },
  { path: "/profile", Component: Profile },
]);
export default function Routes() {
  return (
    <ErrorBoundry>
      <RouterProvider router={routes} fallbackElement="loading" />
      <CustomSnack />
    </ErrorBoundry>
  );
}
