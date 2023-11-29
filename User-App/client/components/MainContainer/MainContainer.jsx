import React from "react";
import Home from "./Home/Home.jsx";
import Search from "./Search/Search.jsx";
import Listing from "./Listing/Listing.jsx";
import { Route, Routes } from "react-router-dom";

const MainContainer = () => {
  return (
    <div id="main-container">
      <Header />
      <Routes>
        <Route path="/listing" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default MainContainer;
