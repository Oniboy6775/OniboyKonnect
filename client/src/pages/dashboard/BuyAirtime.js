import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
// import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BuyAirtime = () => {
  const {
    user,
    showAlert,
    displayAlert,

    isLoading,
    handleChange,
    phoneNumber,
    amount,
    network,
    networkOptions,
    airtimeDiscount,
    buyAirtime,
  } = useAppContext();

  const handleBuyAirtimeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  const amountToCharge = (amount * airtimeDiscount) / 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !phoneNumber || !network) {
      displayAlert();
      return;
    }
    if (phoneNumber.length != 11) {
      displayAlert("Enter a valid number");
      return;
    }
    if (amount < 100) {
      displayAlert("Minimum purchase is ₦100 ");
      return;
    }
    if (user.userBalance < amountToCharge) {
      displayAlert("Insufficient balance");
      return;
    }
    buyAirtime();
  };
  return (
    <>
      <Wrapper className="row">
        <form className="col form" onSubmit={handleSubmit}>
          <h3>buy airtime</h3>
          {showAlert && <Alert />}

          <div className="form-center">
            <FormRowSelect
              labelText="Select network"
              name="network"
              value={network}
              handleChange={handleBuyAirtimeInput}
              list={networkOptions}
            />
            <FormRow
              labelText="Phone number"
              type="number"
              name="phoneNumber"
              value={phoneNumber}
              handleChange={handleBuyAirtimeInput}
            />
            <FormRow
              type="number"
              labelText="amount"
              name="amount"
              value={amount}
              handleChange={handleBuyAirtimeInput}
            />
            <FormRow
              disabled={true}
              type="number"
              labelText="You will be charged"
              name="amount"
              value={amountToCharge}
              handleChange={handleBuyAirtimeInput}
            />

            <button
              className="btn btn-block"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please Wait..." : "Buy now"}
            </button>
          </div>
        </form>
        <section className="col balance__check__container">
          <h4 className="title">check balance codes</h4>
          <div className="alert alert-danger">MTN - *556#</div>
          <div className="alert alert-success">GLO - #124#</div>
          <div className="alert alert-success">9mobile - *232#</div>
          <div className="alert alert-danger">AIRTEL- *123#</div>
        </section>
      </Wrapper>
    </>
  );
};

export default BuyAirtime;
const Wrapper = styled.div`
  width: 100%;
  background: var(--white);
  border-radius: var(--borderRadius);
  transition: var(--transition);
  box-shadow: var(--shadow-2);
  .form {
    margin-bottom: 2rem;
  }
  .balance__check__container {
    padding: 1rem;
  }
  @media (min-width: 800px) {
    display: flex;
    align-items: center;
    padding: 1rem;

    .form {
      max-width: 100% !important;
      margin-right: 1rem;
    }
    .col {
      width: 100%;
    }
  }
`;
