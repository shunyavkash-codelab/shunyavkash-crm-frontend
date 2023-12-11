import React from "react";
import ErrorBoundry from "./component/ErrorBoundry";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CustomSnack from "./component/ui/CustomSnack";
import Home from "./page/Home";
import Manager from "./page/Manager";
import Clients from "./page/Clients";
import Projects from "./page/Projects";
import Invoices from "./page/Invoices";
import Profile from "./page/Profile";
import SignUp from "./page/SignUp";
import SignIn from "./page/SignIn";
import ForgotPassword from "./page/ForgotPassword";
import ConfirmPassword from "./page/ConfirmPassword";

const routes = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/manager", Component: Manager },
  { path: "/clients", Component: Clients },
  { path: "/projects", Component: Projects },
  { path: "/invoices", Component: Invoices },
  { path: "/profile", Component: Profile },
  { path: "/signup", Component: SignUp },
  { path: "/signin", Component: SignIn },
  { path: "/forgotpassword", Component: ForgotPassword },
  { path: "/confirmpassword", Component: ConfirmPassword },
]);
export default function Routes() {
  return (
    <ErrorBoundry>
      <RouterProvider router={routes} fallbackElement="loading" />
      <CustomSnack />
    </ErrorBoundry>
  );
}
