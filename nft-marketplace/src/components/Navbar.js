// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/marketplace">Marketplace</Link></li>
        <li><Link to="/my-collection">My Collection</Link></li>
        <li><Link to="/ethereum">Ethereum Interaction</Link></li>
        <li><Link to="/tezos">Tezos Interaction</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
