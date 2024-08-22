import React from "react";
import mainlogo from "../assets/software-developer.jpg";
import { useSelector } from "react-redux";
import { selectUser } from "../app/userSlice";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser } = useSelector(selectUser);
  const firstName = currentUser?.user?.firstName;
  const lastName = currentUser?.user?.lastName;

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
        {firstName && lastName && (
          <span className="user-greeting">
            Welcome, {firstName} {lastName}
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
