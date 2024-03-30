// import React from 'react';
// import SearchList from "../components/SearchList"
// import Navbar from "../components/Navbar"

// const View = () => {
//   return (
//     <div>
//       <Navbar />
//       <SearchList />
//     </div>
//   );
// };

// export default View;

import React, { useState } from 'react';
import SearchList from "../components/SearchList"
import Navbar from "../components/Navbar"
import "../styles/View.css";

const View = () => {

  return (
    <div className='container__view'>
      <Navbar />
      {/* Pass the handleSetAnswer function as a prop to the SearchList component */}
      <SearchList />
      {/* Display the answer */}
    </div>
  );
};

export default View;

