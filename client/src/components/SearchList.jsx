// import React, { useState } from "react";
// import axios from "axios";
// import "./SearchList.css";
// import { NavLink } from "react-router-dom";

// const SearchList = () => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");

//   const handleChange = (event) => {
//     setQuestion(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://academixaid-app-backend-one-production.up.railway.app/api/fetch-answer",
//         { question }
//       );
//       setAnswer(response.data.answer);
//     } catch (error) {
//       console.error("Error fetching answer:", error.message);
//     }
//   };

//   return (
//     <>
//       <NavLink to="/home" className="home_route">Go to Home</NavLink>
//       <h2>Search a Query!</h2><br />
//       <div className="search-list-container">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={question}
//             onChange={handleChange}
//             placeholder="Search your question..."
//             className="input-container"
//           />
//           <button className="button-container" type="submit">
//             Search
//           </button>
//         </form>
//         {answer && (
//           <div className="answer-container">
//             <h3>Answer:</h3>
//             <p>{answer}</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SearchList;

import React, { useState } from "react";
import axios from "axios";
import "./SearchList.css";
import { NavLink } from "react-router-dom";

const SearchList = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (event) => {
    const { value } = event.target;
    setQuestion(value);
    // Fetch suggestions based on input value
    try {
      const response = await axios.post(
        "https://academixaid-app-backend-one-production.up.railway.app/api/fetch-suggestions",
        { question: value }
      );
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://academixaid-app-backend-one-production.up.railway.app/api/fetch-answer",
        { question }
      );
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error fetching answer:", error.message);
    }
  };

  return (
    <>
      <NavLink to="/home" className="home_route">Go to Home</NavLink>
      <h2>Search Your Answers!</h2><br />
      <div className="search-list-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={handleChange}
            placeholder="Search your Question..."
            className="input-container"
            list="suggestions"
          />
          <datalist id="suggestions">
            {suggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
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
      <NavLink to="/chat" className="chat_route">Chat Room</NavLink>
    </>
  );
};

export default SearchList;


