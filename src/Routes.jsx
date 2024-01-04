import React from "react";
import ErrorBoundry from "./component/ErrorBoundry";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CustomSnack from "./component/ui/CustomSnack";
import SignUp from "./page/SignUp";
import SignIn from "./page/SignIn";
import ForgotPassword from "./page/ForgotPassword";
import ConfirmPassword from "./page/ConfirmPassword";
import Home from "./page/Home";
import EmployeeDashboard from "./page/EmployeeDashboard";
import EmployeeDashboard2 from "./page/EmployeeDashboard2";
import Manager from "./page/Manager";
import AddManager from "./page/AddManager";
import ViewManager from "./page/ViewManager";
import Clients from "./page/Clients";
import AddClient from "./page/AddClient";
import ViewClient from "./page/ViewClient";
import Projects from "./page/Projects";
import AddProject from "./page/AddProject";
import Invoices from "./page/Invoices";
import AddInvoice from "./page/AddInvoice";
import PreviewInvoice from "./page/PreviewInvoice";
import Profile from "./page/Profile";
import ViewProject from "./page/ViewProject";
import Employees from "./page/Employees";
import ApplyLeave from "./page/ApplyLeave";
import MyProfile from "./page/MyProfile";
import AccountManage from "./page/AccountManage";

const routes = createBrowserRouter([
  { path: "/signup", Component: SignUp },
  { path: "/signin", Component: SignIn },
  { path: "/forgot-password", Component: ForgotPassword },
  { path: "/confirm-password", Component: ConfirmPassword },
  { path: "/", Component: Home },
  { path: "/employee-dashboard", Component: EmployeeDashboard },
  { path: "/employeedashboard2", Component: EmployeeDashboard2 },
  { path: "/managers", Component: Manager },
  { path: "/managers/add", Component: AddManager },
  { path: "/managers/view/:id", Component: ViewManager },
  { path: "/clients", Component: Clients },
  { path: "/Clients/add", Component: AddClient },
  { path: "/Clients/edit/:id", Component: AddClient },
  { path: "/Clients/view/:id", Component: ViewClient },
  { path: "/projects", Component: Projects },
  { path: "/Projects/add", Component: AddProject },
  { path: "/Projects/edit/:id", Component: AddProject },
  { path: "/Projects/view/:id", Component: ViewProject },
  { path: "/invoices", Component: Invoices },
  { path: "/invoices/add/:invoiceNumber", Component: AddInvoice },
  { path: "/invoices/add/:invoiceNumber/preview", Component: PreviewInvoice },
  { path: "/invoices/edit/:invoiceNumber/preview", Component: PreviewInvoice },
  { path: "/invoices/view/:invoiceNumber", Component: PreviewInvoice },
  { path: "/invoices/edit/:invoiceNumber", Component: AddInvoice },
  { path: "/employees", Component: Employees },
  { path: "/profile", Component: Profile },
  { path: "/applyleave", Component: ApplyLeave },
  { path: "/my-profile", Component: MyProfile },
  { path: "/account-management", Component: AccountManage },
]);
export default function Routes() {
  return (
    <ErrorBoundry>
      <RouterProvider router={routes} fallbackElement="loading" />
      <CustomSnack />
    </ErrorBoundry>
  );
}
