import React from "react";
import { Link } from "react-router-dom";
import picture from '../../../assets/fireplace-416042_1280.jpg'

const Welcome = () => {


  return (
    <div id="welcome">
        <div id='home-content'>
            <div id='home-search'>
                <h3>Luxury Rentals</h3>
                <p>Pick from the most comfortable accomodations at a great price</p>
                <div className='welcome-form'><h5>LOCATION</h5><input id="location-search" placeholder='New York, NY'></input></div>
                <div className='checkin'>
                    <div id='check-in'><h5>CHECK IN</h5><input id="checkin-search" placeholder='Start Date'></input></div>
                    <span id='divider'></span>
                    <div id='check-out'><h5>CHECK OUT</h5><input id="checkout-search" placeholder='End Date'></input></div>
                </div>
                <Link id='link-search' to='/search'><button><div>Search</div></button></Link>
            </div>
            <div id='home-img'>
            <img ></img>
            </div>
        </div>

    </div>
  );
};

export default Welcome;