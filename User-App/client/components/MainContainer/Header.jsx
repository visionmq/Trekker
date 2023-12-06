import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/Trekker_final.png'

const Header = () => {

  const rabbitTest = () => {
    console.log('sending a fetch to INV')
    fetch("/rabbit", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        message: {
          method: "checkout",
          status: "app-preCharge-check-inv",
          body: {
            userName: "HenryTheHorse",
            total: 123.70,
            cardNum: "1111111111111111",
            email: "jcreyes917@gmail.com",
            propertyID: "6568c6155533b3ac5b224cd2",
            property: 'my new house ',
            quantity: 2,
            orderID: "",
            charged: false,
          },
        },
      }),
    });
  }

  return (
    <div id="header">
      {/* <img src={logo}></img> */}
      <button id='test' onClick={rabbitTest}>Test Rabbit</button>
      <Link className='top-buttons' to='/'><button>Home</button></Link>
      <Link className='top-buttons' to='/search'><button>Search</button></Link>
      <Link className='top-buttons' to='/listing'><button>Listing</button></Link>
    </div>
  );
};

export default Header;