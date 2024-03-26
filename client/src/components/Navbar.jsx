import React from "react";
import mainlogo from "../assets/academixAid.jpg";
import { useSelector } from "react-redux";
import { selectUser } from "../app/userSlice";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser } = useSelector(selectUser);

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={mainlogo}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          AcademixAid
        </a>
      </div>
      <div className="navbar-user">
        {currentUser && currentUser.user && (
          <span className="user-greeting">
            Welcome, {currentUser.user.firstName} {currentUser.user.lastName}
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
