import React from "react";
import Details from "./Details.jsx"
import Images from "./Images.jsx"



const Listing = () => {
  return (
    <div class="listing">
      <div id="listing-page">
        <Images />
        <Details />
      </div>
    </div>
  );
};

export default Listing;
