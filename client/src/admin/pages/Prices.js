import React from "react";
import styled from "styled-components";
import { Alert, FormRow, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import PricesContainer from "../components/EachPrice";
const Prices = () => {
  const { network, networkOptions, handleChange, dataPrices, showAlert } =
    useAppContext();
  const handleChangePriceInput = (e) => {
    e.preventDefault();
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const currentDataOptions = dataPrices.filter(
    (e) => e.networkName === network
  );
  return (
    <Wrapper>
      <form className="form">
        <FormRowSelect
          name="network"
          value={network}
          list={networkOptions}
          handleChange={handleChangePriceInput}
        />
      </form>
      <h4 className="title">My {network} prices</h4>
      {showAlert && <Alert />}
      <div className="prices__container">
        {currentDataOptions.map((e, index) => (
          <PricesContainer key={e._id} {...e} />
        ))}
      </div>
    </Wrapper>
  );
};

export default Prices;
const Wrapper = styled.div`
  padding: 0 1rem;

  .prices__container {
    @media (min-width: 600px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
