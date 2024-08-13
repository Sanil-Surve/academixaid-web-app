// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SignUp from "./screens/SignUp";
// import Login from "./screens/Login";
// import Home from "./screens/Home";
// import Landing from "./screens/Landing";
// import View from "./screens/View";
// import Chat from "./screens/Chat";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<SignUp />} exact/>
//         <Route path="/login" element={<Login />} exact/>
//         <Route path="/home" element={<Home />} exact/>
//         <Route path="/" element={<Landing />} exact/>
//         <Route path="/search" element={<View />} exact/>
//         <Route path="/chat" element={<Chat />} exact/>
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load the components
const SignUp = lazy(() => import('./screens/SignUp'));
const Login = lazy(() => import('./screens/Login'));
const Home = lazy(() => import('./screens/Home'));
const Landing = lazy(() => import('./screens/Landing'));
const View = lazy(() => import('./screens/View'));
const Chat = lazy(() => import('./screens/Chat'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/signup" element={<SignUp />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/home" element={<Home />} exact />
          <Route path="/" element={<Landing />} exact />
          <Route path="/search" element={<View />} exact />
          <Route path="/chat" element={<Chat />} exact />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
