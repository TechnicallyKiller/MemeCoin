// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../styles';
import { connectWallet } from '../services/ethereumService';

const Navbar = () => {
  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      alert("Wallet connected");
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/marketplace">Marketplace</Link>
      <Link to="/my-collection">My Collection</Link>
      <Button onClick={handleConnectWallet}>Connect Wallet</Button>
    </nav>
  );
};

export default Navbar;
