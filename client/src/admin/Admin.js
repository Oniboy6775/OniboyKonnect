import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import AdminNav from "./components/AdminNav";
import AdminSideBar from "./components/AdminSideBar";
const Admin = () => {
  const { fetchAdmin } = useAppContext();
  useEffect(() => fetchAdmin(), []);
  return (
    <Container>
      <AdminNav />
      <AdminSideBar />
      <div className="admin__outlets">
        <Outlet />
      </div>
    </Container>
  );
};

export default Admin;
const Container = styled.div`
  .btn-block {
    padding: 1rem;
    align-items: center;
  }

  .admin__outlets {
    padding-top: var(--nav-height);
    max-width: var(--max-width);
    margin: auto;
    width: 90%;
    /* border: 2px solid var(--primary-300); */
    min-height: 100vh;
  }
`;
