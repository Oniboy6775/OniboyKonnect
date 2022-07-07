import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { FormRow, Loading } from "../../components";
import { useAppContext } from "../../context/appContext";
import moment from "moment";
import TransactionDetails from "../../pages/dashboard/TransactionDetails";
const Transactions = () => {
  const {
    search,
    handleChange,
    userTransactions,
    userAccount,
    isLoading,
    fetchUserTransaction,
    clearValues,
  } = useAppContext();
  const handleSearch = (e) => {
    e.preventDefault();
    if (isLoading) return;
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
  const handleSubmit = (e) => {
    e.preventDefault();
    clearValues();
  };
  const [showDetails, setShowDetails] = useState({
    status: false,
    details: {},
  });
  useEffect(() => fetchUserTransaction(), [search, userAccount]);
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <FormRow
            labelText="username"
            type="text"
            name="userAccount"
            value={userAccount}
            handleChange={handleSearch}
          />
          <FormRow
            labelText="Number"
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
        </div>
        <button type="submit" className="btn btn-block alert-danger">
          clear filter
        </button>
      </form>
      <h3 className="title">Users Transactions</h3>
      <h5 className="title">{userTransactions.length} transactions found</h5>
      {showDetails.status && (
        <TransactionDetails
          {...showDetails.details}
          close={() => setShowDetails({ ...showDetails, status: false })}
        />
      )}
      <div className="table">
        {isLoading ? (
          <Loading center />
        ) : (
          <DataTable
            columns={columns}
            data={userTransactions}
            pagination
            highlightOnHover
            pointerOnHover
            // conditionalRowStyles={conditionalCellStyles}
            onRowClicked={(row, event) => {
              setShowDetails({
                ...showDetails,
                status: !showDetails.status,
                details: { ...row },
              });
            }}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Transactions;
const Wrapper = styled.div``;
