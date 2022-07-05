import React from "react";
import styled from "styled-components";
import { FormRow } from "../../components";
import { useAppContext } from "../../context/appContext";
import UsersContainer from "../components/UsersContainer";
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
      <UsersContainer />
    </Wrapper>
  );
};

export default MyUsers;
const Wrapper = styled.div``;
