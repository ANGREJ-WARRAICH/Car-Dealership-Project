// Group members:

// Angrej Singh - 026
// Akashdeep Singh Gill - 925
// Karanpreet Sachdeva - 994
// Riya Sidhu - 435
// Manmeet Kaur - 039

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Dashboard from "./Dashboard";
import Header from "./Components/Header/Header";
import CarDetails from "./CarDetails";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarRequest from "./CarRequest";
import PageNotFound from "./PageNotFound";

function App() {
  const [Istoken, setIstoken] = useState("");
  useEffect(() => {
    setIstoken(Cookies.get("token"));
  }, [Istoken]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Header />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/pendingcars"
            element={
              <>
                <Header />
                <CarRequest />
              </>
            }
          />

          <Route
            path="/carDetails/:id"
            element={
              <>
                <Header />
                <CarDetails />
              </>
            }
          />
          <Route path="/dashboard" element={<Navigate to="/login" replace />} />
          <Route
            path="/carDetails/:id"
            element={<Navigate to="/login" replace />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
