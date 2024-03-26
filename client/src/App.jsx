import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Landing from "./screens/Landing";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} exact/>
        <Route path="/login" element={<Login />} exact/>
        <Route path="/home" element={<Home />} exact/>
        <Route path="/" element={<Landing />} exact/>
      </Routes>
    </Router>
  );
};

export default App;
