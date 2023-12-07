import React from "react";
import Details from "./Details.jsx"
import Images from "./Images.jsx"
import Checkout from "./Checkout.jsx";


const Listing = () => {
  return (
    <div class="listing">
      <Images />
      <Details />
      <Checkout />
    </div>
  );
};

export default Listing;
