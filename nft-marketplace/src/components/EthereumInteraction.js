// src/components/EthereumInteraction.js
import React, { useState, useEffect } from 'react';
import { connectWallet, getAccount, getBalance } from '../services/ethereumService';

const EthereumInteraction = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const acc = await getAccount();
        const bal = await getBalance();
        setAccount(acc);
        setBalance(bal);
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };

    // Load account data if wallet is already connected
    if (window.ethereum) {
      loadAccountData();
    }
  }, []);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      const acc = await getAccount();
      const bal = await getBalance();
      setAccount(acc);
      setBalance(bal);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  return (
    <div>
      <h2>Ethereum Interaction</h2>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      ) : (
        <button onClick={handleConnectWallet}>Connect Ethereum Wallet</button>
      )}
    </div>
  );
};

export default EthereumInteraction;
