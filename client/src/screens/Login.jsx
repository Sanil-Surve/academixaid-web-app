import "../styles/Login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAsync } from "../app/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(loginUserAsync({ email, password }));
      if (!response.payload.success) {
        throw new Error(
          response.payload.message || "Login failed. Please try again."
        );
      }
      setEmail(" ");
      setPassword(" ");
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="user__container">
      <div className="login__container">
        <h2>Login Here</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <br />
        <p>
          User Not Found! <Link to="/signup">Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
