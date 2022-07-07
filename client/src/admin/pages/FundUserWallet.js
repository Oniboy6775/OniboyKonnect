import React, { useState } from "react";
import styled from "styled-components";
import { Alert, FormRow, Loading } from "../../components";
import { useAppContext } from "../../context/appContext";

const FundUserWallet = () => {
  const {
    handleChange,
    userAccount,
    isValidated,
    validatedName,
    amount,
    validateUser,
    isLoading,
    showAlert,
    FundUserWallet,
  } = useAppContext();
  const handleTransferFundChange = (e) => {
    e.preventDefault();
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidated) return validateUser();
    FundUserWallet();
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        {showAlert && <Alert center />}
        <FormRow
          name="userAccount"
          value={userAccount}
          type="text"
          labelText="username"
          disabled={isValidated}
          handleChange={handleTransferFundChange}
          placeholder={isValidated && validatedName}
        />
        {isValidated && (
          <>
            <h5 className="title">{validatedName}</h5>
            <FormRow
              name="amount"
              value={amount}
              type="number"
              handleChange={handleTransferFundChange}
            />
          </>
        )}
        <button disabled={isLoading} className="btn" type="submit">
          {isValidated ? "submit" : "Validate User"}
        </button>
        {isLoading && <Loading />}
      </form>
    </Wrapper>
  );
};

export default FundUserWallet;
const Wrapper = styled.div``;
