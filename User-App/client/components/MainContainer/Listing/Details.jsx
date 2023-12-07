import React from "react";
import Checkout from "./Checkout.jsx";

const Details = () => {
  return (
    <div id="details">
      <div class="description">
          <h1>Chateau d'Jake</h1>
          <h3>Listed by Bandersnatch LLC</h3>
          <p>Prepare for an extraordinary journey at Chateau d’Jake, a storied estate originally built in 1782 for the 10th Earl of Roths, John Leslie. This intriguing abode promises intrepid adventurers an experience unlike any other. While it might not meet contemporary building codes, this chateau boasts an unparalleled view of the Thames and an element of risk around every corner.</p>
      </div>
      <div id='listing-specs'>
            <div id='features'>
                <p><b>Bedrooms:</b> 700 Bedrooms</p>
                <p><b>Bathrooms:</b> 100 Bathrooms</p>
                <p><b>Kitchen:</b> 100 Kitchens</p>
                <p><b>Living Space:</b> 100 Living rooms</p>
                <p><b>Additional Features:</b> A full on-site staff.</p>
            </div>
          </div>
      <Checkout />
    </div>
  );
};

export default Details;
