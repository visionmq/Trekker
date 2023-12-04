import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

  const rabbitTest = () => {
    fetch('/rabbit', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({message: 'hello'})
    })
  }

  return (
    <div id="header">
      <Link to='/'><button>Home</button></Link>
      <Link to='/search'><button>Search</button></Link>
      <Link to='/listing'><button>Listing</button></Link>
      <button onClick={rabbitTest}>Test Rabbit</button>
    </div>
  );
};

export default Header;