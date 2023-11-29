import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div id="header">
      <Link to='/'><button>Home</button></Link>
      <Link to='/search'><button>Search</button></Link>
      <Link to='/listing'><button>Listing</button></Link>
    </div>
  );
};

export default Header;