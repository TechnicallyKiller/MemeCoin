// src/services/ethereumService.js
import { ethers, formatEther } from 'ethers';

const provider = new ethers.BrowserProvider(window.ethereum);
let signer;

export async function connectWallet() {
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
}

export async function getAccount() {
  if (!signer) {
    signer = await provider.getSigner();
  }
  return signer.address;
}

export async function getBalance() {
  const balance = await provider.getBalance(await getAccount());
  return formatEther(balance);
}

// Add this function to fetch NFTs
export async function fetchNFTs(contractAddress, tokenId) {
  // Example ABI with a basic ERC721 interface
  const abi = [
    "function tokenURI(uint256 tokenId) external view returns (string memory)",
    "function ownerOf(uint256 tokenId) external view returns (address)"
  ];

  const contract = new ethers.Contract(contractAddress, abi, provider);
  const tokenURI = await contract.tokenURI(tokenId);
  const owner = await contract.ownerOf(tokenId);

  return { tokenURI, owner };
}

