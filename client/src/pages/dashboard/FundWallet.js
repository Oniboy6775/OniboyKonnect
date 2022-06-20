import React, { useState } from "react";
import styled from "styled-components";
import { FaCopy } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
const FundWallet = () => {
  const { user } = useAppContext();
  const [activeButton, setActiveButton] = useState(1);
  const ReservedAccount = () => (
    <section className="reserved__account__container ">
      <small className="info">
        All payment made to any of the accounts below will automatically fnd
        your wallet. 1.08% charges applied
      </small>
      <div className="row">
        <div className="card">
          <h3 className="title">Wema bank</h3>
          <div className="title-underline"></div>
          <p>
            0878928329 <FaCopy />
          </p>
          <div className="title">Oniboy</div>
        </div>
        <div className="card">
          <h3 className="title">Rolex bank</h3>
          <div className="title-underline"></div>
          <p>
            9839392329 <FaCopy />
          </p>
          <p>DataReloaded-{user?.userName}</p>
        </div>
      </div>
    </section>
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
      {activeButton === 3 && <DirectDeposit />}
    </Container>
  );
};

export default FundWallet;
const Container = styled.div`
  background-color: var(--white);
  padding: 1rem;
  text-align: center;
  /* border: 2px solid red; */
  /* min-height: 100%; */
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
