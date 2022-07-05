import React from "react";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const IsAdmin = ({ children }) => {
  const { isAdmin, token } = useAppContext();

  if (!isAdmin || !token) return <Navigate to="/" />;
  return children;
};

export default IsAdmin;
