import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Home from "./Home/Home.jsx";
import Search from "./Search/Search.jsx";
import Listing from "./Listing/Listing.jsx";

const MainContainer = () => {

  // const location = useLocation();

  return (
    <div id="main-container">
      <Header />
      <Routes location={location} key={location.pathname}>
        <Route path="/listing" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default MainContainer;
