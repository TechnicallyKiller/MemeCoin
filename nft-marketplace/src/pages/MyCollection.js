// src/pages/MyCollection.js
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { PlusCircle } from 'lucide-react'

export default function MyCollection() {
  const dummyNFTs = [
    { id: 1, name: "Cosmic Kitty", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Digital Dreamscape", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Neon Nebula", image: "/placeholder.svg?height=100&width=100" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">As dope as me</h1>
      <p className="text-xl mb-8">Your personal NFT collection is displayed here.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyNFTs.map((nft) => (
          <Card key={nft.id}>
            <CardHeader>
              <CardTitle>{nft.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover rounded-md" />
            </CardContent>
          </Card>
        ))}
        <Card className="flex items-center justify-center">
          <Button variant="ghost" className="h-full w-full flex flex-col items-center justify-center">
            <PlusCircle className="h-12 w-12 mb-2" />
            <span>Add New NFT</span>
          </Button>
        </Card>
      </div>
    </div>
  );
}