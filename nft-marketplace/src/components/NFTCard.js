// src/components/NFTCard.js
import React from 'react';
import { Card } from '../styles';

const NFTCard = ({ tokenURI, owner }) => {
  return (
    <Card>
      <img src={tokenURI} alt="NFT" style={{ width: '100%' }} />
      <p>Owner: {owner}</p>
    </Card>
  );
};

export default NFTCard;
