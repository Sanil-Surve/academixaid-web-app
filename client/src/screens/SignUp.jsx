import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "../app/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(
        registerUserAsync({ firstName, lastName, email, password })
      );
      if (!response.payload.success) {
        throw new Error(
          response.payload.message || "Registration failed. Please try again."
        );
      }
      setFirstName(" ");
      setLastName(" ");
      setEmail(" ");
      setPassword(" ");
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="user__container">
      <div className="signup__container">
        <h2>Create An Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="register-btn">Register</button>
        </form>
        <br />
        <p>
          If you already have an account, Please <Link to="/login">Login</Link> Here
        </p>
      </div>
    </div>
  );
}

export default SignUp;
