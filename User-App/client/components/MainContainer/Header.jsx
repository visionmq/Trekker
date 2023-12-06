import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/Trekker_final.png'

const Header = () => {

  const rabbitTest = () => {
    fetch('/inv', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({message: {
        method: 'checkout',
        status: 'app-preCharge-check-inv',
        body:{
          total: '',
          username: '',
          cardNum: '',
          email: '',
          property_id: '',
          quantity: ''
        }
      }})
    })
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