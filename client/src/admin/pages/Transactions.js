import React from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { FormRow } from "../../components";
import { useAppContext } from "../../context/appContext";
import moment from "moment";
const Transactions = () => {
  const { search, handleChange, userTransactions } = useAppContext();
  const handleSearch = (e) => {
    e.preventDefault();
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const columns = [
    {
      name: "NETWORK",
      selector: (row) =>
        `${row.transNetwork.split(" ")[0]} ₦${row.transNetwork.split(" ")[1]}`,
    },
    {
      name: "AMOUNT",
      selector: (row) => `₦${row.transAmount}`,
    },

    {
      name: "NUMBER",
      selector: (row) => row.transNumber,
    },
    {
      name: "DATE",
      selector: (row) => moment(row.createdAt).format("h:mm:ss a DD/MM/YY"),
    },
    {
      name: "BEFORE",
      selector: (row) => `₦${row.balanceBefore.toFixed(2)}`,
    },
    {
      name: "AFTER",
      selector: (row) => `₦${row.balanceAfter.toFixed(2)}`,
    },
    {
      name: "STATUS",
      selector: (row) => row.transStatus,
    },
  ];
  return (
    <Wrapper>
      <form className="form">
        <div className="form-row">
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
        </div>
        <button className="btn">submit</button>
      </form>
      <h3 className="title">Users Transactions</h3>
      <div className="table">
        <DataTable
          columns={columns}
          data={userTransactions}
          pagination
          highlightOnHover
          pointerOnHover
          // conditionalRowStyles={conditionalCellStyles}
          onRowClicked={(row, event) => {
            // setShowDetails({
            //   ...showDetails,
            //   status: !showDetails.status,
            //   details: { ...row },
            // });
          }}
        />
      </div>
    </Wrapper>
  );
};

export default Transactions;
const Wrapper = styled.div``;
