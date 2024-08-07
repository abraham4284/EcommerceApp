import React from "react";
import { UseAuth } from "./../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Spiner } from "../components";

export const ProtectedRouteClientes = () => {
  const { loading, isAutenticated } = UseAuth();
  if (loading) return <Spiner />;
  if (!loading && !isAutenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};
