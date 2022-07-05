import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import TransactionDetails from "./TransactionDetails";

const Dashboard = () => {
  const { user, isLoading, transactions } = useAppContext();
  const [showDetails, setShowDetails] = useState({
    status: false,
    details: {},
  });
  const navigate = useNavigate();

  const navigation = [
    { name: "Airtime", image: "airtime.svg", link: "buy-airtime" },
    { name: "data", image: "data.jpg", link: "buy-data" },
    { name: "TV", image: "cable.jpg", link: "tv" },
    { name: "Utility", image: "utility.jpg", link: "electricity" },
    { name: "History", image: "history.png", link: "/profile/transactions" },
    { name: "withdraw", image: "withdraw.png", link: "/profile/dashboard" },
  ];

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
      <section className="wallet__balance__container">
        <p className="balance">₦ {user?.userBalance.toFixed(2)}</p>
        <button
          className="btn btn-hipster"
          onClick={() => navigate("fund-wallet")}
        >
          fund wallet
        </button>
      </section>
      <section className="services">
        {navigation.map((e, index) => (
          <div
            key={index}
            className="each__service"
            onClick={() => navigate(e.link)}
          >
            <img src={`./assets/${e.image}`} alt="airtime" className="img" />
            <p>{e.name}</p>
          </div>
        ))}
      </section>
      <section className="history">
        <h2 className="title">Transaction history</h2>
        <div className="title-underline"></div>
        <div className="table">
          {isLoading ? (
            <h1 className="title">Loading...</h1>
          ) : (
            <>
              {showDetails.status && (
                <TransactionDetails
                  {...showDetails.details}
                  close={() =>
                    setShowDetails({ ...showDetails, status: false })
                  }
                />
              )}
              {transactions.length < 1 ? (
                <h5 className="title">No transactions yet</h5>
              ) : (
                <DataTable
                  columns={columns}
                  data={transactions}
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
            </>
          )}
        </div>
      </section>
    </Wrapper>
  );
};

export default Dashboard;
const Wrapper = styled.div`
  .wallet__balance__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .balance {
    font-size: 1.2rem;
    font-weight: 900;
    line-height: 1;
  }
  .services {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    transition: var(--transition);
    /* border: 2px solid red; */
    /* max-height: 30vh;
    height: 100%;
    border: 2px solid red; */
  }
  .each__service {
    margin: 0.3rem 0.5rem;
    text-align: center;
    text-transform: capitalize;
    border: 2px solid var(--primary-300);
    background: var(--white);
    padding: 0 1rem;
    box-shadow: var(--shadow-4);
    border-radius: 10px;
    width: 8rem;
    transition: var(--transition);
    cursor: pointer;
    &:hover {
      /* transform: rotate(-10deg); */
      border-width: 5px;
    }
  }
  .table {
    border: 2px solid var(--primary-500);
  }
  /* @media (min-width: 400px) {
    .each__service {
      width: 20%;
    }
  } */
`;
