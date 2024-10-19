import React from 'react'
import NFTList from '../components/NFTList'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Coins } from 'lucide-react'

const Container = ({ children }) => (
  <div className="container mx-auto px-4 py-8">
    {children}
  </div>
)

const Title = ({ children }) => (
  <h1 className="text-3xl font-bold mb-6">{children}</h1>
)

const NFTCard = ({ name, image, price, creator }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Created by: {creator}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center">
          <Coins className="w-4 h-4 mr-1" />
          <span className="font-bold">{price} ETH</span>
        </div>
        <Button>Buy Now</Button>
      </CardFooter>
    </Card>
  )
}

const Marketplace = () => {
  const contractAddress = "0xYourContractAddressHere"
  
  const exampleNFTs = [
    {
      id: 1,
      name: "Cosmic Voyager",
      image: "/exampleIMG/nft1.jpg",
      price: 0.5,
      creator: "0x1234...5678"
    },
    {
      id: 2,
      name: "Digital Dreamscape",
      image: "",
      price: 0.75,
      creator: "0xabcd...efgh"
    },
    {
      id: 3,
      name: "Neon Nebula",
      image: "/placeholder.svg?height=300&width=300",
      price: 1.2,
      creator: "0x9876...5432"
    },
    {
      id: 4,
      name: "Pixel Paradise",
      image: "/placeholder.svg?height=300&width=300",
      price: 0.3,
      creator: "0xijkl...mnop"
    }
  ]

  return (
    <Container>
      <Title>NFT Marketplace</Title>
      <p className="text-gray-600 dark:text-gray-300 mb-8">Discover and collect unique digital assets</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exampleNFTs.map((nft) => (
          <NFTCard key={nft.id} {...nft} />
        ))}
      </div>
      <NFTList contractAddress={contractAddress} />
    </Container>
  )
}

export default Marketplace