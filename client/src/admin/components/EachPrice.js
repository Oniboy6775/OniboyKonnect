import React from "react";
import styled from "styled-components";
import { FormRow } from "../../components";
import { useAppContext } from "../../context/appContext";

const EachPrice = ({
  dataVolume,
  networkName,
  resellerPrice,
  validity,
  _id,
  price,
}) => {
  const { newPrice, newResellerPrice, handleChange, isLoading, updatePrice } =
    useAppContext();
  const handleChangePriceInput = (e) => {
    e.preventDefault();
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePrice(_id);
  };
  return (
    <Wrapper>
      <h5 className="title">
        {networkName} {dataVolume} {validity}
      </h5>
      <form className="prices__input__container" onSubmit={handleSubmit}>
        <FormRow
          name="newPrice"
          value={newPrice}
          labelText="Price"
          type="number"
          placeholder={price}
          handleChange={handleChangePriceInput}
        />
        <FormRow
          name="newResellerPrice"
          value={newResellerPrice}
          labelText="Reseller"
          type="number"
          placeholder={resellerPrice}
          handleChange={handleChangePriceInput}
        />
      </form>
      <button
        disabled={isLoading}
        type="submit"
        onClick={handleSubmit}
        className="btn btn-block"
      >
        Update price
      </button>
    </Wrapper>
  );
};

export default EachPrice;
const Wrapper = styled.section`
  background-color: var(--white);
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-4);
  .prices__input__container {
    display: flex;
  }
`;
