import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import styled from "styled-components";
import DataTable from "react-data-table-component";

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    // showStats();
    // eslint-disable-next-line
  }, []);
  // if (isLoading) {
  //   return <Loading center />;
  // }
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
      name: "Network",
      selector: (row) => row.network,
    },
    {
      name: "Number",
      selector: (row) => row.phoneNumber,
    },

    {
      name: "status",
      selector: (row) => row.status,
    },
  ];

  let data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];
  data = data.map((e, index) => {
    e.id = Math.random();
    e.network = "MTN";
    e.status = "Success";
    e.phoneNumber = "08108126121";
    return e;
  });
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
  return (
    <Wrapper>
      <section className="wallet__balance__container">
        <p className="balance">₦500</p>
        <button className="btn btn-hipster">fund wallet</button>
      </section>
      <section className="services">
        {navigation.map((e, index) => (
          <div key={index} className="each__service">
            <img src={`./assets/${e.image}`} alt="airtime" className="img" />
            <p>{e.name}</p>
          </div>
        ))}
      </section>
      <section className="history">
        <h1 className="title">Transaction history</h1>
        <div className="title-underline"></div>
        <div className="table">
          <DataTable
            columns={columns}
            data={data}
            // selectableRows
            expandableRowsComponent={ExpandedComponent}
            pagination
          />
        </div>
      </section>
    </Wrapper>
  );
};

export default Stats;
const Wrapper = styled.div`
  /* border: 2px solid red; */
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
    /* max-height: 30vh;
    height: 100%;
    border: 2px solid red; */
  }
  .each__service {
    margin: 1rem;
    text-align: center;
    text-transform: capitalize;
    border: 2px solid var(--primary-300);
    background: var(--white);
    padding: 0 1rem;
    box-shadow: var(--shadow-4);
    border-radius: 10px;
    width: 9rem;
    transition: var(--transition);
    cursor: pointer;
    &:hover {
      /* transform: rotate(-10deg); */
      border-width: 5px;
    }
  }
  .table {
    /* border: 2px solid red; */
  }
  /* @media (min-width: 400px) {
    .each__service {
      width: 20%;
    }
  } */
`;
