import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Register from "./components/Login/Register"
import CreateDocument from './components/AddDocument/CreateDocument'
import DuyetDocument from './components/DuyetDocument/DuyetDocument'
import Users from './components/Users/Users';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/CreateDocument" element={<CreateDocument />} />
          <Route path="/DuyetDocument" element={<DuyetDocument />} />
          <Route path="/Users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
