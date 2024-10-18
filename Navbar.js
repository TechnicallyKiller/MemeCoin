import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between p-4">
      <div className="text-2xl font-bold text-white mb-4 md:mb-0">MEME-COIN</div>
      <div className="flex flex-wrap gap-4">
        <Link to="/" className="text-white hover:text-purple-200">Home</Link>
        <Link to="/marketplace" className="text-white hover:text-purple-200">Marketplace</Link>
        <Link to="/mycollection" className="text-white hover:text-purple-200">My Collection</Link>
        <Link to="/ethereum" className="text-white hover:text-purple-200">Ethereum Interaction</Link>
        <Link to="/tezos" className="text-white hover:text-purple-200">Tezos Interaction</Link>
        <Link to="/meme-coin" className="text-white hover:text-purple-200">MemeCoin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
