import React from "react";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";

const UsersContainer = () => {
  return (
    <Wrapper>
      <div className="each__user">
        <header>
          <div className="main-icon">A</div>
          <div className="info">
            <h5 className="">username</h5>
            <p className="">Member since: 12 jul 2002</p>
          </div>
        </header>
        <div className="content">
          <div className="user__info">
            <span className="icon">
              <FaUser />
            </span>
            <span className="text">#3000</span>
          </div>
          <div className="user__info">
            <span className="icon">
              <FaUser />
            </span>
            <span className="text">#3000</span>
          </div>
          <div className="user__info">
            <span className="icon">
              <FaUser />
            </span>
            <span className="text">onisabiabdullahi@gmail.com</span>
          </div>
        </div>
        <footer className="footer">
          <button className="btn delete-btn">Delete user</button>
          <button className="btn">Transactions</button>
        </footer>
      </div>
      <div className="each__user">
        <header>
          <div className="main-icon">A</div>
          <div className="info">
            <h5 className="">username</h5>
            <p className="">Member since: 12 jul 2002</p>
          </div>
        </header>
        <div className="content">
          <div className="user__info">
            <span className="icon">
              <FaUser />
            </span>
            <span className="text">#3000</span>
          </div>
          <div className="user__info">
            <span className="icon">
              <FaUser />
            </span>
            <span className="text">#3000</span>
          </div>
          <div className="user__info">
            <span className="icon">
              <FaUser />
            </span>
            <span className="text">onisabiabdullahi@gmail.com</span>
          </div>
        </div>
        <footer className="footer">
          <button className="btn delete-btn">Delete user</button>
          <button className="btn">Transactions</button>
        </footer>
      </div>
      <div className="each__user">
        <header>
          <div className="main-icon">A</div>
          <div className="info">
            <h5 className="">username</h5>
            <p className="">Member since: 12 jul 2002</p>
          </div>
        </header>
        <div className="content">
          <div className="user__info">
            <span className="icon">
              <FaUser />
            </span>
            <span className="text">#3000</span>
          </div>
          <div className="user__info">
            <span className="icon">
              <FaUser />
            </span>
            <span className="text">#3000</span>
          </div>
          <div className="user__info">
            <span className="icon">
              <FaUser />
            </span>
            <span className="text">onisabiabdullahi@gmail.com</span>
          </div>
        </div>
        <footer className="footer">
          <button className="btn delete-btn">Delete user</button>
          <button className="btn">Transactions</button>
        </footer>
      </div>
    </Wrapper>
  );
};

export default UsersContainer;
const Wrapper = styled.article`
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  padding: 0 1rem;
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }
  .each__user {
    background: var(--white);
    margin-bottom: 1rem;
  }
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .user__info {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
  }
  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-400);
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }

  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    /* border: 2px solid red; */
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }
`;
