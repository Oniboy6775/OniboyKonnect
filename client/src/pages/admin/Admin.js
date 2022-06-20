import React from "react";
import styled from "styled-components";
const Admin = () => {
  return (
    <Container>
      <div className="btns">
        <button className="btn btn-block">Admin Balance</button>
        <button className="btn btn-block">My Prices</button>
        <button className="btn btn-block">My users</button>
        <button className="btn btn-block">Users Transaction</button>
        <button className="btn btn-block">Email</button>
        {/* <button className="btn"></button> */}
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
  @media (min-width: 600px) {
    .btns {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .btn {
      width: 40%;
      margin: 0.5rem;
    }
  }
`;
