import React, { useState } from 'react';
import './styles/globals.css';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Wallet, CreditCard, Send, Flame, Home, Folder, ShoppingBag } from 'lucide-react';
import { connectWallet, getAccount, getBalance } from './services/ethereumService';
import { connectTezosWallet, getTezosAccount, getTezosBalance } from './services/tezosService';
import { mintMeme, transferMeme, burnMeme } from './components/nftService';
import IPFSUpload from './components/IPFSUpload';
import HomePage from './pages/home';
import MarketplacePage from './pages/Marketplace';
import MyCollectionPage from './pages/MyCollection';

export default function AppLayout() {
  const [activeTab, setActiveTab] = useState('home');
  const [ethereumAccount, setEthereumAccount] = useState('');
  const [ethereumBalance, setEthereumBalance] = useState('');
  const [tezosAccount, setTezosAccount] = useState('');
  const [tezosBalance, setTezosBalance] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [tokenUri, setTokenUri] = useState('');

  const handleConnectEthereum = async () => {
    try {
      await connectWallet();
      const account = await getAccount();
      setEthereumAccount(account);
      const balance = await getBalance(account);
      setEthereumBalance(balance);
    } catch (error) {
      console.error('Error connecting Ethereum wallet:', error);
    }
  };
  


  const handleConnectTezos = async () => {
    try {
      await connectTezosWallet();
      const account = await getTezosAccount();
      setTezosAccount(account);
      const balance = await getTezosBalance(account);
      setTezosBalance(balance);
    } catch (error) {
      console.error('Error connecting Tezos wallet:', error);
    }
  };

  const handleMintMeme = async () => {
    try {
      await mintMeme(recipientAddress, tokenUri);
      alert('NFT minted successfully!');
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Failed to mint NFT');
    }
  };

  const handleTransferMeme = async () => {
    try {
      await transferMeme(recipientAddress,tokenId);
      alert('NFT transferred successfully!');
    } catch (error) {
      console.error('Error transferring NFT:', error);
      alert('Failed to transfer NFT');
    }
  };

  const handleBurnMeme = async () => {
    try {
      await burnMeme(tokenId);
      alert('NFT burned successfully!');
    } catch (error) {
      console.error('Error burning NFT:', error);
      alert('Failed to burn NFT');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">MEME-COIN</h1>
          <nav>
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              className="w-full justify-start mb-2"
              onClick={() => setActiveTab('home')}
            >
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
            <Button
              variant={activeTab === 'collections' ? 'default' : 'ghost'}
              className="w-full justify-start mb-2"
              onClick={() => setActiveTab('collections')}
            >
              <Folder className="mr-2 h-4 w-4" /> My Collections
            </Button>
            <Button
              variant={activeTab === 'marketplace' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('marketplace')}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Marketplace
            </Button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'home' && (
          <div>
            <HomePage />

            {/* IPFS Upload & Retrieval */}
            

            {/* Ethereum and Tezos Tabs */}
            <Tabs defaultValue="ethereum" className="w-full mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
                <TabsTrigger value="tezos">Tezos</TabsTrigger>
              </TabsList>
              <TabsContent value="ethereum">
                <Card>
                  <CardHeader>
                    <CardTitle>Ethereum Wallet</CardTitle>
                    <CardDescription>Manage your Ethereum assets and NFTs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Account:</strong> {ethereumAccount || 'Not connected'}</p>
                      <p><strong>Balance:</strong> {ethereumBalance || 'N/A'} ETH</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleConnectEthereum}>
                      <Wallet className="mr-2 h-4 w-4" /> Connect Ethereum Wallet
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="tezos">
                <Card>
                  <CardHeader>
                    <CardTitle>Tezos Wallet</CardTitle>
                    <CardDescription>Manage your Tezos assets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Account:</strong> {tezosAccount || 'Not connected'}</p>
                      <p><strong>Balance:</strong> {tezosBalance || 'N/A'} XTZ</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleConnectTezos}>
                      <Wallet className="mr-2 h-4 w-4" /> Connect Tezos Wallet
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            {/* NFT Operations */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>NFT Operations</CardTitle>
                <CardDescription>Mint, transfer, or burn NFTs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient Address</label>
                    <Input
                      id="recipient"
                      placeholder="0x..."
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="tokenId" className="block text-sm font-medium text-gray-700">Token ID</label>
                    <Input
                      id="tokenId"
                      placeholder="Token ID"
                      value={tokenId}
                      onChange={(e) => setTokenId(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="tokenUri" className="block text-sm font-medium text-gray-700">Token URI</label>
                    <Input
                      id="tokenUri"
                      placeholder="ipfs://..."
                      value={tokenUri}
                      onChange={(e) => setTokenUri(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={handleMintMeme}>
                  <CreditCard className="mr-2 h-4 w-4" /> Mint NFT
                </Button>
                <Button onClick={handleTransferMeme}>
                  <Send className="mr-2 h-4 w-4" /> Transfer NFT
                </Button>
                <Button onClick={handleBurnMeme} variant="destructive">
                  <Flame className="mr-2 h-4 w-4" /> Burn NFT
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {activeTab === 'collections' && <MyCollectionPage />}
        {activeTab === 'marketplace' && <MarketplacePage />}
      </div>
    </div>
  );
}
