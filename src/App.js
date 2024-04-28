import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Screen from './components/Screen/Screen';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Screen/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
