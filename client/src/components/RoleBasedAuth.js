import React from "react";
import { useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";

const RoleBasedAuth = ({ allowedRoles, children }) => {
  const auth = useAuthUser();

  const userRole = auth()?.values?.role; 

  if (!userRole) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleBasedAuth;
