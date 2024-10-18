import React, { useState, useEffect } from 'react';
import { connectWallet, getAccount, getBalance } from '../services/ethereumService';
import { mintNFT, transferNFT, burnNFT } from './nftService'; // Import contract methods

const EthereumInteraction = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [recipient, setRecipient] = useState('');
  const [tokenURI, setTokenURI] = useState('');
  const [tokenId, setTokenId] = useState('');

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

  const handleMintNFT = async () => {
    try {
      const tx = await mintNFT(recipient, tokenURI);
      console.log('Mint successful:', tx);
    } catch (error) {
      console.error('Minting failed:', error);
    }
  };

  const handleTransferNFT = async () => {
    try {
      const tx = await transferNFT(recipient, tokenId);
      console.log('Transfer successful:', tx);
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  const handleBurnNFT = async () => {
    try {
      const tx = await burnNFT(tokenId);
      console.log('Burn successful:', tx);
    } catch (error) {
      console.error('Burning failed:', error);
    }
  };

  return (
    <div>
      <h2>Ethereum Interaction</h2>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          <p>Balance: {balance} ETH</p>

          {/* Mint NFT */}
          <h3>Mint NFT</h3>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <input
            type="text"
            placeholder="Token URI"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
          />
          <button onClick={handleMintNFT}>Mint NFT</button>

          {/* Transfer NFT */}
          <h3>Transfer NFT</h3>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <input
            type="text"
            placeholder="Token ID"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
          <button onClick={handleTransferNFT}>Transfer NFT</button>

          {/* Burn NFT */}
          <h3>Burn NFT</h3>
          <input
            type="text"
            placeholder="Token ID"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
          <button onClick={handleBurnNFT}>Burn NFT</button>
        </div>
      ) : (
        <button onClick={handleConnectWallet}>Connect Ethereum Wallet</button>
      )}
    </div>
  );
};

export default EthereumInteraction;
