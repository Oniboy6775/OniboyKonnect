import React from "react";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const IsAdmin = ({ children }) => {
  const { isAdmin } = useAppContext();

  if (!isAdmin) return <Navigate to="/" />;
  return children;
};

export default IsAdmin;
