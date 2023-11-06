import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Main from "./components/Main/Main";
import Home from "./components/Home/Home";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/room/:roomId" element={<Main />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
