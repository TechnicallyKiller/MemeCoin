import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import MyCollection from './pages/MyCollection';
import { Link } from 'react-router-dom';
import EthereumInteraction from './components/EthereumInteraction';
import TezosInteraction from './components/TezosInteraction';


function App() {
  return (
    <Router>
      <div className="App">
         {/* Render your MemeCoin UI */}
        <Navbar />
        <h1>MEME-COIN</h1>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/my-collection" element={<MyCollection />} />
          {/* Routes for Ethereum and Tezos Interactions */}
          <Route path="/ethereum" element={<EthereumInteraction />} />
          <Route path="/tezos" element={<TezosInteraction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
