import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import MyCollection from './pages/MyCollection';
import EthereumInteraction from './components/EthereumInteraction';
import TezosInteraction from './components/TezosInteraction';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/mycollection" element={<MyCollection />} />
          <Route path="/ethereum" element={<EthereumInteraction />} />
          <Route path="/tezos" element={<TezosInteraction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
