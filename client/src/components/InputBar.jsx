// import React, { useState } from "react";
// import "./InputBar.css";

// const InputBar = ({ onSubmit }) => {
//   const [question, setQuestion] = useState("");

//   const handleSave = () => {
//     onSubmit(question);
//     setQuestion("");
//   };

//   return (
//     <div className="input-container">
//       <div className="input-bar">
//         <input
//           type="text"
//           placeholder="Enter your Question..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <button onClick={handleSave}>Submit</button>
//       </div>
//     </div>
//   );
// };

// export default InputBar;

import React, { useState } from "react";
import "./InputBar.css";

const InputBar = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");

  const handleSave = () => {
    onSubmit(question);
    setQuestion("");
  };

  return (
    <div className="input-container">
      <div className="input-bar">
        <input
          type="text"
          placeholder="Enter your Question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleSave}>Submit</button>
      </div>
    </div>
  );
};

export default InputBar;

