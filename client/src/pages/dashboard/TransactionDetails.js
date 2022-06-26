import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { FaCopy, FaTimes } from "react-icons/fa";
import { RiRefund2Fill } from "react-icons/ri";
import { ImCheckmark } from "react-icons/im";
import { useAppContext } from "../../context/appContext";
const TransactionDetails = ({
  transAmount,
  createdAt,
  transStatus,
  transType,
  transNetwork,
  transNumber,
  balanceAfter,
  balanceBefore,
  close,
}) => {
  const { isAdmin } = useAppContext();
  const [isCopied, setIsCopied] = useState(false);
  const copyNumber = () => {
    navigator.clipboard.writeText(transNumber);
    setIsCopied(!isCopied);
  };
  return (
    <Wrapper>
      <div className="center__container">
        <h2 className="title">Transaction details</h2>
        <h4 className={`title ${transStatus} `}>{transStatus}</h4>
        <h1 className="title">₦{transAmount.toFixed(2)}</h1>
        <div className="close" onClick={close}>
          <FaTimes />
        </div>
        <div className="row">
          <span>Transaction type</span>
          <span>{transType}</span>
        </div>
        <div className="row">
          <span>Network</span>
          <span>{transNetwork}</span>
        </div>
        <div className="row">
          <span>Token/Username</span>
          <span>
            {transNumber}{" "}
            {isCopied ? <ImCheckmark /> : <FaCopy onClick={copyNumber} />}
          </span>
        </div>
        <div className="row">
          <span>Date</span>
          <span>{moment(createdAt).format("h:mm:ss a DD/MM/YY")}</span>
        </div>
        <div className="row">
          <span>Old balance</span>
          <span>{balanceBefore.toFixed(2)}</span>
        </div>
        <div className="row">
          <span>New balance</span>
          <span>{balanceAfter.toFixed(2)}</span>
        </div>
        {isAdmin &&
          transStatus !== "refunded" &&
          transType !== "transfer" &&
          transType !== "wallet" &&
          transType !== "refund" && (
            <div className="refund__btn">
              <button className=" btn ">
                <RiRefund2Fill className="icon" />
                Refund
              </button>
            </div>
          )}
      </div>
    </Wrapper>
  );
};

export default TransactionDetails;
const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  .center__container {
    max-width: var(--fixed-width);
    width: 90%;
    border: 2px solid var(--primary-500);
    border-radius: var(--borderRadius);
    margin: auto;
    background-color: var(--grey-100);
    padding: 1rem;
    position: relative;
  }
  .row {
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;
    padding-bottom: 1rem;
  }
  .close {
    background-color: var(--primary-500);
    padding: 0.5rem;
    border-radius: var(--borderRadius);
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  .success {
    color: green;
  }
  .failed {
    color: red;
  }
  .pending {
    color: yellow;
  }
  .refund__btn {
    text-align: center;
    margin: auto;
    text-transform: uppercase;
  }
  .icon {
    font-size: 1.3rem;
    margin-right: 0.5rem;
  }
`;
