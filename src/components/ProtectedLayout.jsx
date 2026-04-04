import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirige vers login si pas connecté
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <Navbar />
      <main style={{ padding: "20px 10px", minHeight: "70vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default ProtectedLayout;
