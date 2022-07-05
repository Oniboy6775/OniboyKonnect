import React, { useState } from "react";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import Wrapper from "../../assets/wrappers/Navbar";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";

const AdminNav = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { logoutUser, user, toggleSidebar } = useAppContext();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn">
          <FaAlignLeft onClick={() => toggleSidebar()} />
        </button>
        <div className="">
          <button className="btn" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.userName}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminNav;
