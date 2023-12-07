import React from "react";
import pic from '/Users/jake/Desktop/Codesmith/Projects/OSP/Trekker/User-App/client/assets/bedroom-6778193_1280.jpg'

const GridResult = () => {
  //for loop to generate grid results

  return (
    <div className="grid-result">
      <div className='result-image'><img src={pic}></img></div>
      <div className='result-description'>
        <h3>Bedroom</h3>
        <p className="result-subhead">Great bedroom</p>
        <span><p>$35/day</p><p>Available: 1</p></span>
      </div>
    </div>
  );
};

export default GridResult;
