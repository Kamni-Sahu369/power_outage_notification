// import React from "react";
// import { Navigate } from "react-router-dom";

// const PublicRoute = ({ children }) => {
//   const isLogin = JSON.parse(localStorage.getItem("isLogin")); // true or false
//   const role = localStorage.getItem("role");

//   if (isLogin && role === "admin") {
//     return <Navigate to="/dashboard" replace />;
//   }

//   if (isLogin && role === "user") {
//     return <Navigate to="/user" replace />;
//   }

//   return children; // Not logged in → show public pages
// };

// export default PublicRoute;



import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLogin = localStorage.getItem("isLogin") === "true";
  const role = localStorage.getItem("role");

  if (isLogin && role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLogin && role === "user") {
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default PublicRoute;
