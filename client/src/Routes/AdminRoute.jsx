import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if user exists and has 'admin' status
  if (!user || user?.status !== "admin") {
    // Redirect to login or home page if not an admin
    return <Navigate to="/login" />;
  }

  // Render children if user is admin
  return <>{children}</>;
};

export default AdminRoute;
