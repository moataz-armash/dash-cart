// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import SigninPage from "./pages/SigninPage";
import PhoneNumberPage from "./pages/PhoneNumberPage";
import OtpPage from "./pages/OtpPage";
import SigninAnimationPage from "./pages/SigninAnimationPage";
import NotFoundPage from "./pages/NotFoundPage";
import { PhoneNumberProvider } from './contexts/PhoneNumberContext';

function App() {
  return (
    <div className="App">
      <PhoneNumberProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn-page" element={<LearnPage />} />
          <Route path="/signin-page" element={<SigninPage />} />
          <Route path="/phone-number-page" element={<PhoneNumberPage />} />
          <Route path="/otp-page" element={<OtpPage />} />
          <Route path="/signing-animation-page" element={<SigninAnimationPage />} />
          <Route path="*" element={<NotFoundPage />} /> 404 route
        </Routes>
      </Router>
      </PhoneNumberProvider>
    </div>
  );
}

export default App;
