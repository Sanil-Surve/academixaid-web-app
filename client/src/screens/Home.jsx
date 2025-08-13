import { useState } from "react";
import InputBar from "../components/InputBar";
import Navbar from "../components/Navbar";
import "../styles/Home.css";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchAnswer = async (question) => {
    try {
      const response = await fetch(`http://31.97.202.251:4000/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch answer");
      }

      const data = await response.json();
      console.log(data);
      return data.answer;
    } catch (error) {
      setError(error.message);
      console.error("Error fetching answer:", error.message);
      return null;
    }
  };

  const handleSave = async (question) => {
    setSavedQuestions([...savedQuestions, { question, answer: "" }]);
    const answer = await fetchAnswer(question);
    setSavedQuestions((prevQuestions) =>
      prevQuestions.map((item) =>
        item.question === question ? { ...item, answer } : item
      )
    );
    console.log(answer);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://31.97.202.251:4000/sign-out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the token is stored in localStorage
        },
      });

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      localStorage.removeItem("token"); // Clear token from storage
      navigate("/"); // Redirect to landing page
    } catch (error) {
      setError(error.message);
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <>
      <div className="container__home">
        <Navbar />
        <button onClick={handleLogout} className="logout_button">
          Logout
        </button>
        <NavLink to="/search" className="search_route">
          Go to Search
        </NavLink>
        <h2 className="tagline">How can I help you Today!</h2>
        <InputBar onSubmit={handleSave} />
        <br />
        <div className="list">
          {savedQuestions.length > 0 && (
            <ul>
              {savedQuestions.map((item, index) => (
                <li key={index}>
                  <div className="question-answer-container">
                    <p className="question">{item.question}</p>:<br />
                    <pre className="answer">{item.answer || "Loading..."}</pre>
                    {error && <div className="error-message">{error}</div>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
