import React from "react";
import { useToken } from "../store";
import { Outlet, Navigate } from "react-router-dom";

const RouteGuard = () => {
  const hasJWT = () => {
    const { access, refresh } = useToken.getState();
    return access !== "" && refresh !== "";
  };

  return hasJWT() ? <Outlet /> : <Navigate to="/signin" />;
};

export default RouteGuard;
