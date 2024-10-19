// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn-page" element={<LearnPage />} />
          <Route path="*" element={<NotFoundPage />} /> 404 route
        </Routes>
      </Router>
    </div>
  );
}

export default App;
