import React from "react";
import Admin from "./components/Admin";
import Staff from "./components/Staff";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return (
      <>
        <Router>{user.approver === 1 ? <Admin /> : <Staff />}</Router>
      </>
    );
  } else {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/auth/login" />} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
