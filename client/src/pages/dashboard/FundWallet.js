import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCopy } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { useAppContext } from "../../context/appContext";
import { Alert, FormRow, Loading } from "../../components";
const FundWallet = () => {
  const { user, userBalance, showAlert, isLoading, handleChange } =
    useAppContext();
  const [activeButton, setActiveButton] = useState(1);
  // const amountToBeCredited = amount - amount * 0.015;
  const [config, setConfig] = useState({
    amount: 0,
    paymentInitiated: false,
  });
  const [isCopied, setIsCopied] = useState(false);
  const handleFundWalletChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };
  useEffect(() => {
    // if (isCopied) setIsCopied(false);
    setTimeout(() => setIsCopied(false), [2000]);
  }, [isCopied]);
  const ReservedAccount = () => (
    <section className="reserved__account__container ">
      <small className="info">
        All payment made to any of the accounts below will automatically fnd
        your wallet. 1.08% charges applied
      </small>
      <div className="row">
        <div className="card">
          <h3 className="title">{user.reservedAccBank}</h3>
          <div className="title-underline"></div>
          <p>
            {user.reservedAccNo}{" "}
            {isCopied ? (
              <ImCheckmark />
            ) : (
              <FaCopy onClick={() => copy(user.reservedAccNo)} />
            )}
          </p>
          <div className="title">OniboyKonnect-{user.userName}</div>
        </div>
        <div className="card">
          <h3 className="title">{user.reservedAccBank2}</h3>
          <div className="title-underline"></div>
          <p>
            {user.reservedAccNo2}
            {isCopied ? (
              <ImCheckmark />
            ) : (
              <FaCopy onClick={() => copy(user.reservedAccNo2)} />
            )}
          </p>
          <p>OniboyKonnect-{user?.userName}</p>
        </div>
      </div>
    </section>
  );

  const AtmDeposit = () => (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="title">Flutterwave</h3>
      {showAlert && <Alert />}
      <div className="form-center">
        {/* <FormRow
          labelText="amount"
          type="number"
          name="amount"
          value={amount}
          handleChange={handleFundWalletChange}
        />

        <FormRow
          disabled
          type="number"
          labelText="You will be credited"
          name="amountToCharge"
          value={amountToBeCredited}
          handleChange={handleFundWalletChange}
        /> */}
        {/* <div className="form-row">
          <label htmlFor="" className="form-label">
            Amount
          </label>
          <input
            type="text"
            className="form-input"
            value={config.amount}
            onChange={(e) => setConfig({ ...config, amount: e.target.value })}
          />
        </div> */}

        {/* <button className="btn btn-block" type="submit" disabled={isLoading}>
          {isLoading ? "Please Wait..." : "Pay now"}
        </button> */}
        <h1 className="title">coming soon....</h1>
      </div>
      {isLoading && <Loading center />}
    </form>
  );

  const DirectDeposit = () => (
    <section className="direct__deposit">
      <small className="info">
        Pay into the account below and message the admin by clicking the
        whatsapp icon below
      </small>
      <div className="card">
        <h2 className="title">Zenith bank</h2>
        <p>
          2284036393 <FaCopy />
        </p>
        <p className="title">Onisabi Abdullahi Kolawole</p>
      </div>
    </section>
  );

  const paymentMethods = [
    { id: 1, name: "Reserved account" },
    { id: 2, name: "atm/bank transfer" },
    { id: 3, name: "direct deposit" },
  ];
  return (
    <Container>
      <div className="row">
        {paymentMethods.map((e, index) => (
          <button
            key={index}
            onClick={() => setActiveButton(e.id)}
            className={
              e.id === activeButton ? "btn btn-block active " : "btn btn-block "
            }
          >
            {e.name}
          </button>
        ))}
      </div>
      {activeButton === 1 && <ReservedAccount />}
      {activeButton === 2 && <AtmDeposit />}
      {activeButton === 3 && <DirectDeposit />}
    </Container>
  );
};

export default FundWallet;
const Container = styled.div`
  background-color: var(--white);

  padding: 0 1rem;
  text-align: center;

  .btn-block {
    margin-bottom: 0.5rem;
  }
  .info {
    text-align: center !important;
    min-width: 100% !important;
  }
  .active {
    background: transparent;
    border: 2px solid var(--primary-800);
    color: var(--primary-900);
    font-weight: 900;
    box-shadow: var(--shadow-4);
  }
  @media (min-width: 600px) {
    .row {
      display: flex;
      justify-content: center;
    }
    .btn,
    .card {
      margin: 1rem;
    }
  }
`;
