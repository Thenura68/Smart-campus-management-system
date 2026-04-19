import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/common/Footer";
import Chatbot from "./components/Chatbot/Chatbot";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <AppRoutes />
        <Footer />
        <Chatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;