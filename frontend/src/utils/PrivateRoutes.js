import { Outlet, Navigate } from "react-router";
import React from "react";
import { useUser } from "../context/userContext/context";

const PrivateRoutes = () => {
  const {
    userState: { user },
    token,
  } = useUser();

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
