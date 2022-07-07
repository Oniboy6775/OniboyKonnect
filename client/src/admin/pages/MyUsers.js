import React, { useEffect } from "react";
import styled from "styled-components";
import { FormRow } from "../../components";
import { useAppContext } from "../../context/appContext";
import UsersContainer from "../components/UsersContainer";
const MyUsers = () => {
  const {
    isLoading,
    userAccount,
    handleChange,
    userSearchBalance,
    fetchUsers,
    clearValues,
    myUsers,
  } = useAppContext();
  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clearValues();
  };
  useEffect(() => fetchUsers(), [userAccount, userSearchBalance]);
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <FormRow
          labelText="username"
          type="text"
          name="userAccount"
          value={userAccount}
          handleChange={handleSearch}
        />
        <FormRow
          labelText="balance less than"
          type="text"
          name="userSearchBalance"
          value={userSearchBalance}
          handleChange={handleSearch}
        />
        <div className="btn-container">
          <button type="submit" className="btn btn-block alert-danger">
            clear filter
          </button>
        </div>
      </form>
      <h3 className="title">My users </h3>
      <div className="title-underline"></div>
      <h5 className="title">{myUsers.length} users found</h5>
      <UsersContainer />
    </Wrapper>
  );
};

export default MyUsers;
const Wrapper = styled.div``;
