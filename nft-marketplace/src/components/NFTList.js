// src/components/NFTList.js
import React, { useEffect, useState } from 'react';
import NFTCard from './NFTCard';
import { fetchNFTs } from '../services/ethereumService';

const NFTList = ({ contractAddress }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const loadNFTs = async () => {
      const nftData = [];
      for (let i = 1; i <= 5; i++) { // Fetch first 5 NFTs
        const nft = await fetchNFTs(contractAddress, i);
        nftData.push(nft);
      }
      setNfts(nftData);
    };
    loadNFTs();
  }, [contractAddress]);

  return (
    <div>
      {nfts.map((nft, index) => (
        <NFTCard key={index} tokenURI={nft.tokenURI} owner={nft.owner} />
      ))}
    </div>
  );
};

export default NFTList;
