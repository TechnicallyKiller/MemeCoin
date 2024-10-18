import React, { useState, useEffect } from 'react';
import { connectWallet, getAccount, getBalance } from '../services/ethereumService';
import { mintNFT, transferNFT, burnNFT } from './nftService'; // Import contract methods
import { Button, Input, Card } from './UIComponents'; // Import your UI components

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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Ethereum Interaction</h2>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          <p>Balance: {balance} ETH</p>

          {/* Mint NFT */}
          <Card title="Mint NFT">
            <Input
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <Input
              placeholder="Token URI"
              value={tokenURI}
              onChange={(e) => setTokenURI(e.target.value)}
            />
            <Button onClick={handleMintNFT}>Mint NFT</Button>
          </Card>

          {/* Transfer NFT */}
          <Card title="Transfer NFT">
            <Input
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <Input
              placeholder="Token ID"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
            <Button onClick={handleTransferNFT}>Transfer NFT</Button>
          </Card>

          {/* Burn NFT */}
          <Card title="Burn NFT">
            <Input
              placeholder="Token ID"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
            <Button onClick={handleBurnNFT}>Burn NFT</Button>
          </Card>
        </div>
      ) : (
        <Button onClick={handleConnectWallet}>Connect Ethereum Wallet</Button>
      )}
    </div>
  );
};

export default EthereumInteraction;
