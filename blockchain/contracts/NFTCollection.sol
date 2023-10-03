// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract NFTCollection is ERC721, ERC721URIStorage, AccessControl {
    uint256 constant COLLECTION_LIMIT = 200;
    uint256 tokenCounter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(address _admin) ERC721("NFTCollection", "NFTC") {
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(MINTER_ROLE, _admin);
    }

    function getTokenCounter() external view returns (uint256) {
        return tokenCounter;
    }

    function safeMint(
        address to,
        string memory uri
    ) public onlyRole(MINTER_ROLE) {
        require(tokenCounter < COLLECTION_LIMIT, "Collection is over");
        tokenCounter++;
        _safeMint(to, tokenCounter);
        _setTokenURI(tokenCounter, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
