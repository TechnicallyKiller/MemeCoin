// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import MyCollection from './pages/MyCollection';
import EthereumInteraction from './components/EthereumInteraction';
import TezosInteraction from './components/TezosInteraction';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <h1>Multi-Blockchain DApp</h1>
        <EthereumInteraction />
        <TezosInteraction />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/my-collection" element={<MyCollection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

