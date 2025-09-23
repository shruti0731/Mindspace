import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Login from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import FullGraph from "./components/FullGraph";

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {/* Hide Header on Dashboard */}
      {location.pathname !== "/dashboard" && location.pathname !== "/full-graph" && <Header />}
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/full-graph" element={<FullGraph />} />
      </Routes>

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
