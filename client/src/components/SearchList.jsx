import React, { useState } from "react";
import axios from "axios";
import "./SearchList.css";

const SearchList = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/fetch-answer",
        { question }
      );
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error fetching answer:", error.message);
    }
  };

  return (
    <div className="search-list-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={handleChange}
          placeholder="Search your question..."
          className="input-container"
        />
        <button className="button-container" type="submit">
          Search
        </button>
      </form>
      {answer && (
        <div className="answer-container">
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default SearchList;
