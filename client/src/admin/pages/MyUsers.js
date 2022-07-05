import React from "react";
import styled from "styled-components";
import { FormRow } from "../../components";
import { useAppContext } from "../../context/appContext";
const MyUsers = () => {
  const { isLoading, search, handleChange } = useAppContext();
  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  return (
    <Wrapper>
      <form className="form">
        <FormRow
          type="text"
          name="search"
          value={search}
          handleChange={handleSearch}
        />
        <div className="btn-container">
          <button className="btn ">Submit</button>
        </div>
      </form>
      <h3 className="title">My users </h3>
      <div className="users__container">
        <div className="each__user">
          <header>
            <div className="avatar">A</div>
            <div className="">
              <h2 className="name">Abdullahi</h2>
              <p className="login">Last login: 12 jul 2002</p>
            </div>
          </header>
          <div className="content">
            <p>Balance</p> <span>#600</span>
            <div className="btn-container">
              <button className="btn ">View</button>
              <button className="btn alert-danger">Delete</button>
            </div>
          </div>
        </div>
        <div className="each__user">
          <header>
            <div className="avatar">A</div>
            <div className="">
              <h2 className="name">Abdullahi</h2>
              <p className="login">Last login: 12 jul 2002</p>
            </div>
          </header>
          <div className="content">
            <p>Balance</p> <span>#600</span>
            <div className="btn-container">
              <button className="btn ">View</button>
              <button className="btn alert-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default MyUsers;
const Wrapper = styled.div`
  .each__user {
    padding: 1rem;
    background: var(--white);
    border-radius: var(--borderRadius);
    margin-bottom: 1rem;
  }
  header {
    display: flex;
  }
  .avatar {
    height: 100px;
    width: 100px;
    background: var(--primary-500);
    color: var(--white);
    font-size: 3rem;
    display: flex;
    justify-content: center;
    border-radius: var(--borderRadius);
    margin-right: 2rem;
  }
`;
