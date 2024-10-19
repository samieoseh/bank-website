import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.tsx";
import React from "react";
import ErrorPage from "./pages/error/ErrorPage.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import UserManagementPage from "./pages/main/user-management/UserManagementPage.tsx";
import DashboardPage from "./pages/main/dashboard/DashboardPage.tsx";
import SharedLayout from "./pages/main/shared/SharedLayout.tsx";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import Loans from "./pages/main/loans/Loans.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import TransactionPage from "./pages/main/transactions/TransactionPage.tsx";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/user-management",
        element: <UserManagementPage />,
      },
      {
        path: "/transactions",
        element: <TransactionPage />,
      },
      {
        path: "/loans",
        element: <Loans />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
