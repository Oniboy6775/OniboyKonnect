import { FormRow, Alert, FormRowSelect, Loading } from "../../components";
import { useAppContext } from "../../context/appContext";
// import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BuyData = () => {
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
    dataOptions,
    selectedDataPlan,
    dataSubscriptions,

    buyData,
  } = useAppContext();

  const handleBuyDataInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber || !network || !selectedDataPlan) {
      displayAlert();
      return;
    }
    if (phoneNumber.length != 11) {
      displayAlert("Enter a valid number");
      return;
    }

    // if (user.userBalance < amount) {
    //   displayAlert("Insufficient balance");
    //   return;
    // }
    buyData();
  };
  const currentDataOptions = dataOptions.filter(
    (e) => e.split(" ")[0] === network
  );

  let amountToCharge =
    currentDataOptions.length > 0 && currentDataOptions[0].split("₦")[1];

  if (selectedDataPlan.length > 0)
    amountToCharge = selectedDataPlan.split("₦")[1];

  return (
    <>
      <Wrapper className="row">
        <form className="col form" onSubmit={handleSubmit}>
          <h3>buy data</h3>
          {showAlert && <Alert />}
          <div className="form-center">
            <FormRowSelect
              labelText="Select network"
              name="network"
              value={network}
              handleChange={handleBuyDataInput}
              list={networkOptions}
            />
            <FormRowSelect
              labelText="Select data plan"
              name="selectedDataPlan"
              value={selectedDataPlan}
              handleChange={handleBuyDataInput}
              list={currentDataOptions}
            />
            <FormRow
              labelText="Phone number"
              type="number"
              name="phoneNumber"
              value={phoneNumber}
              handleChange={handleBuyDataInput}
            />

            <FormRow
              disabled={true}
              type="number"
              labelText="You will be charged"
              name="amount"
              value={amountToCharge}
              handleChange={handleBuyDataInput}
            />

            <button
              className="btn btn-block"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please Wait..." : "Buy now"}
            </button>
          </div>
          {isLoading && <Loading center />}
        </form>
        <section className="col balance__check__container">
          <h4 className="title">check balance codes</h4>
          <div className="alert alert-danger">MTN_SME - *461*4#</div>
          <div className="alert alert-success">GLO - *127#</div>
          <div className="alert alert-danger">AIRTEL- *140#</div>
          <div className="alert alert-success">9mobile - *229#</div>
        </section>
      </Wrapper>
    </>
  );
};

export default BuyData;
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
