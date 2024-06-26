import { useState } from "react";
import InputBar from "../components/InputBar";
import Navbar from "../components/Navbar";
import "../styles/Home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [error, setError] = useState("");

  const fetchAnswer = async (question) => {
    try {
      const response = await fetch(`https://academixaid-app-backend-one-production.up.railway.app/api/questions`, {
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

  return (
    <>
      <div className="container__home">
        <Navbar />
        <NavLink to="/search" className="search_route">Go to Search</NavLink>
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
                    <p className="answer">{item.answer || "Loading..."}</p>
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
