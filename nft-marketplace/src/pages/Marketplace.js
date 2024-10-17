// src/pages/Marketplace.js
import React from 'react';
import { Container, Title } from '../styles';
import NFTList from '../components/NFTList';

const Marketplace = () => {
  const contractAddress = "0xYourContractAddress"; // contract address

  return (
    <Container>
      <Title>Buy cool Shit!</Title>
      <NFTList contractAddress={contractAddress} />
    </Container>
  );
};

export default Marketplace;
