import React from "react";
import picture from '../../../assets/fireplace-416042_1280.jpg'

const Welcome = () => {


  return (
    <div id="welcome">
        <div id='home-content'>
            <div id='home-search'>
                <h3>Luxury Rentals</h3>
                <p>Pick from the most comfortable accomodations at a great price</p>
                <div><h5>LOCATION</h5><input placeholder='New York, NY'></input></div>
                <div><h5>CHECK IN</h5><input placeholder='Start Date'></input></div>
                <button>Search</button>
            </div>
            <img id='home-img' src={picture}></img>
        </div>

    </div>
  );
};

export default Welcome;