import { ethers } from 'ethers';

// Contract details
const CONTRACT_ADDRESS = '0x903c9b908a9FCb1C799ED97FEa382811CFB77C6c';

// ABI (fully fixed, no extra brackets)
const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "burnMeme",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mintMeme",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferMeme",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Initialize ethers with the user's MetaMask wallet
export const initializeProvider = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      return provider;
    } catch (error) {
      console.error('Error accessing Ethereum account:', error);
      throw new Error('Could not access Ethereum account');
    }
  } else {
    throw new Error('MetaMask is not installed');
  }
};

// Get contract instance
export const getContract = async () => {
  try {
    const provider = await initializeProvider();
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    console.log("Contract instance:", contract);
    console.log("Contract ABI functions:", contract.interface.functions);
    
    return contract;
  } catch (error) {
    console.error("Error initializing contract:", error);
  }
};

// Mint an NFT
export const mintMeme = async (tokenURI) => {
  try {
    const contract = await getContract();
    if (!contract) throw new Error("Contract is not initialized");
    
    const tx = await contract.mintMeme(tokenURI);
    await tx.wait();
    
    return tx;
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
};

// Transfer an NFT
export const transferMeme = async (recipient, tokenId) => {
  try {
    const contract = await getContract();
    const tx = await contract.transferMeme(recipient, tokenId);
    await tx.wait();
    
    return tx;
  } catch (error) {
    console.error("Error transferring NFT:", error);
    throw error;
  }
};

// Burn an NFT
export const burnMeme = async (tokenId) => {
  try {
    const contract = await getContract();
    const tx = await contract.burnMeme(tokenId);
    await tx.wait();
    
    return tx;
  } catch (error) {
    console.error("Error burning NFT:", error);
    throw error;
  }
};
