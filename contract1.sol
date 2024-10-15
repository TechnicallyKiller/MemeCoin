// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MemeCoinNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Events
    event MemeMinted(address indexed creator, uint256 indexed tokenId, string tokenURI);
    event MemeTransferred(address indexed from, address indexed to, uint256 indexed tokenId);
    event MemeBurned(address indexed owner, uint256 indexed tokenId);

    constructor() ERC721("MemeCoin", "MEME") {}

    /**
     * @dev Mint a new meme as an NFT
     * @param tokenURI URI of the meme metadata
     */
    function mintMeme(string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        emit MemeMinted(msg.sender, newItemId, tokenURI);
        return newItemId;
    }

    /**
     * @dev Transfer a meme NFT to another address
     * @param to Address of the recipient
     * @param tokenId ID of the NFT to transfer
     */
    function transferMeme(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this meme!");
        require(to != address(0), "Cannot transfer to zero address");

        safeTransferFrom(msg.sender, to, tokenId);
        
        emit MemeTransferred(msg.sender, to, tokenId);
    }

    /**
     * @dev Burn a meme NFT
     * @param tokenId ID of the NFT to burn
     */
    function burnMeme(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this meme!");

        _burn(tokenId);
        
        emit MemeBurned(msg.sender, tokenId);
    }

    /**
     * @dev Get total number of memes minted
     */
    function totalMinted() public view returns (uint256) {
        return _tokenIds.current();
    }
}
