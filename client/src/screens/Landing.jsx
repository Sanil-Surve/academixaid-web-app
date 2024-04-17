
import React from "react";
import "../styles/Landing.css";
import mainlogo from "../assets/academixAid.jpg";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="logo-container">
          <img src={mainlogo} className="landing-logo" alt="AcademixAid Logo" />
        </div>
        <h1>AcademixAid: Your Ultimate Online Education Companion</h1>
        <p>
          Welcome to AcademixAid, your one-stop solution for conquering academic
          challenges!
        </p>
        <div className="cta-buttons">
          <NavLink to="/signup" className="button">
            Sign Up
          </NavLink>
          <NavLink to="/login" className="button">
            Login
          </NavLink>
        </div>
      </header>
      <footer>
        <div className="footer-content">
          <p>
            Have questions or need assistance? Contact us at{" "}
            <a href="mailto:academixaid@gmail.com">academixaid@gmail.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;

