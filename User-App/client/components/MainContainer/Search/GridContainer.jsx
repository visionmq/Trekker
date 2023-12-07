import React from "react";
import GridResult from "./GridResult.jsx";
import { Link } from "react-router-dom";

const GridContainer = () => {

    //for loop to generate grid results

    const gridResults = []

    for(let i = 0; i < 25; i++){
      gridResults.push(<Link className='router-link' to='/listing'><GridResult /></Link>)
      //also needs to update redux for current listing
    }
    
  return (
    <div id="search-inside">
      <div id="search-left">
        {/* <h1>Results:</h1> */}
        <div id="grid-container">
          {gridResults}
        </div>
      </div>
    </div>
  );
};

export default GridContainer;
