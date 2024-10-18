import React, { useState } from 'react';
import { Box, VStack, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Container, useColorModeValue } from '@chakra-ui/react';
import EthereumInteraction from './EthereumInteraction';
import TezosInteraction from './TezosInteraction';
import NFTList from './NFTList';
import GetBalance from './getComponents';

export default function MainDashboard() {
  const [activeNetwork, setActiveNetwork] = useState('ethereum');  // Removed TypeScript type annotation
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">
            MEME-COIN Dashboard
          </Heading>

          <Tabs isFitted variant="enclosed" onChange={(index) => setActiveNetwork(index === 0 ? 'ethereum' : 'tezos')}>
            <TabList mb="1em">
              <Tab>Ethereum</Tab>
              <Tab>Tezos</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Box borderWidth={1} borderRadius="lg" p={6} borderColor={borderColor}>
                    <EthereumInteraction />
                  </Box>
                  <Box borderWidth={1} borderRadius="lg" p={6} borderColor={borderColor}>
                    <GetBalance />
                  </Box>
                </VStack>
              </TabPanel>
              <TabPanel>
                <Box borderWidth={1} borderRadius="lg" p={6} borderColor={borderColor}>
                  <TezosInteraction />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Box borderWidth={1} borderRadius="lg" p={6} borderColor={borderColor}>
            <Heading as="h2" size="lg" mb={4}>
              NFT Marketplace
            </Heading>
            <NFTList contractAddress={activeNetwork === 'ethereum' ? 'ETHEREUM_CONTRACT_ADDRESS' : 'TEZOS_CONTRACT_ADDRESS'} />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
