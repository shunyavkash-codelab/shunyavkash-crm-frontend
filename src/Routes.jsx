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
import User from "./page/User";
import AddUser from "./page/AddUser";
import ViewUser from "./page/ViewUser";
import Members from "./page/Members";
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
import LeavesRequests from "./page/LeavesRequests";
import Leaves from "./page/Leaves";
import MyProfile from "./page/MyProfile";
import AccountManage from "./page/AccountManage";
import AccountAdd from "./page/AccountAdd";
import AddMember from "./page/AddMember";
import InvoicePDF from "./page/InvoicePDF";

const routes = createBrowserRouter([
  { path: "/signup", Component: SignUp },
  { path: "/signin", Component: SignIn },
  { path: "/forgot-password", Component: ForgotPassword },
  { path: "/confirm-password", Component: ConfirmPassword },
  { path: "/", Component: Home },
  { path: "/employee-dashboard", Component: EmployeeDashboard },
  { path: "/users", Component: User },
  { path: "/users/add", Component: AddUser },
  // { path: "/users/view/:id", Component: ViewUser },
  { path: "/members/view/:id", Component: ViewUser },
  { path: "/members", Component: Members },
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
  { path: "/invoices/view/:invoiceNumber", Component: InvoicePDF },
  // { path: "/invoices/view/:invoiceNumber", Component: PreviewInvoice },
  { path: "/invoices/edit/:invoiceNumber", Component: AddInvoice },
  { path: "/employees", Component: Employees },
  { path: "/profile", Component: Profile },
  { path: "/leaves-requests", Component: LeavesRequests },
  { path: "/leaves", Component: Leaves },
  { path: "/my-profile", Component: MyProfile },
  // { path: "/my-profile", Component: MyProfile },
  { path: "/my-profile/:id", Component: MyProfile },
  { path: "/account-management", Component: AccountManage },
  { path: "/account-management/add", Component: AccountAdd },
  { path: "/account-management/edit/:id", Component: AccountAdd },
  { path: "/members/add", Component: AddMember },
  { path: "/invoices/edit/:invoiceNumber/invoice-pdf", Component: InvoicePDF },
  { path: "/invoices/add/:invoiceNumber/invoice-pdf", Component: InvoicePDF },
]);
export default function Routes() {
  return (
    <ErrorBoundry>
      <RouterProvider router={routes} fallbackElement="loading" />
      <CustomSnack />
    </ErrorBoundry>
  );
}
