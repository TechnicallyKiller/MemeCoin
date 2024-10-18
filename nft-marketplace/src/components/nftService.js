import { ethers } from 'ethers';
import SimpleNFT from './simple.json'; // ABI file generated when the contract is compiled

const CONTRACT_ADDRESS = '0x184dF0f398F5755c8362a729ef51B5A757E5877f'; // Replace with the deployed contract address

// Initialize ethers with the user's MetaMask wallet
export const initializeProvider = () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }
  // Use BrowserProvider in ethers.js v6
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider;
};
export const getContract = async () => {
    const provider = initializeProvider();
    const network = await provider.getNetwork(); // Get network info
    const signer = await provider.getSigner();
  
    // Check if the network supports ENS
    if (network.chainId !== 1 && network.name !== 'mainnet') {
      // If the network is not Ethereum mainnet, assume ENS is not supported
      console.warn("ENS resolution is not supported on this network:", network.name);
    }
  
    return new ethers.Contract(CONTRACT_ADDRESS, SimpleNFT.abi, signer);
  };


// Mint an NFT
export const mintNFT = async (recipient, tokenURI) => {
  const contract = await getContract();
  const tx = await contract.mintNFT(recipient, tokenURI); // Send the mintNFT transaction
  await tx.wait(); // Wait for transaction to be confirmed
  return tx;
};

// Transfer an NFT
export const transferNFT = async (to, tokenId) => {
  const contract = await getContract();
  const tx = await contract.transferNFT(to, tokenId); // Send the transferNFT transaction
  await tx.wait();
  return tx;
};

// Burn an NFT
export const burnNFT = async (tokenId) => {
  const contract = await getContract();
  const tx = await contract.burnNFT(tokenId); // Send the burnNFT transaction
  await tx.wait();
  return tx;
};
