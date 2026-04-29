// ✅ Step 1: ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");
  const isLogin = localStorage.getItem("isLogin") === "true";

  if (!isLogin || !role) return <Navigate to="/" />;

  return allowedRoles.includes(role) ? children : <Navigate to="/" />;
};

export default ProtectedRoute;