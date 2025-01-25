import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./landing_page/home/HomePage.jsx";
import Nav from "./landing_page/Nav.jsx";
import Footer from "./landing_page/Footer.jsx";
import NotFound from "./landing_page/NotFound.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(


  <React.StrictMode>
    <BrowserRouter>
     <Nav></Nav>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="*" element={< NotFound/>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  </React.StrictMode>
);
