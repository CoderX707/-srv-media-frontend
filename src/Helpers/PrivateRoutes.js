import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { authChecker } from "./Helpers";

export default function PrivateRoute () {
  let user = authChecker();
  return user?.token ? <Outlet /> : <Navigate to="/login" />;
}