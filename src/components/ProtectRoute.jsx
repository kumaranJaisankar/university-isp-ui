import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("user");

  return user === null ? <Navigate to="/login" replace={true} /> : <Outlet />;
};

export default ProtectedRoute;
