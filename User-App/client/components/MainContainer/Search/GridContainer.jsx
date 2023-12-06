import React from "react";
import GridResult from "./GridResult.jsx";

const GridContainer = () => {

    //for loop to generate grid results

    const gridResults = []

    for(let i = 0; i < 15; i++){
      gridResults.push(<GridResult />)
    }
    
  return (
    <div id="search-left">
      <h1>Results:</h1>
      <div id="grid-container">
        {gridResults}
      </div>
    </div>
  );
};

export default GridContainer;
