## Generate-Collection
Web3 application for convenient creation of NFT collections. Best suited for creating custom NFT collections that go in addition to real world assets. Application functionality:
- Сreating NFT by uploading an image, adding description and recipient's address;
- Display of NFT's data in the application interface;
- Ability to add admins who can mint NFTs

### Install
```bash
git clone https://github.com/mikbolshakov/Generate-Collection.git
cd Generate-Collection/frontend
npm install
cd ../backend
npm install
cd ../blockchain
npm install
```

### Run
Important! For each of the frontend/backend/blockchain sections, you need to create a .env file and enter the necessary variables. Feel free to ask me a question if a detailed explanation is needed.

First, deploy and verify a smart contract:
You need to specify the admin address in /scripts/deploy.ts
```bash
cd blockchain
npx hardhat run scripts/deploy.ts --network chain
```

Then, run the server locally to interact with the database
```bash
cd backend
npm run start
```

After that, run the development server and open [localhost:3000](http://localhost:3000) with your browser to see the result:
Also you need to paste contract ABI in /src/additions
```bash
cd frontend
npm start
```

### Built with:

#### Frontend:
 * [React](https://reactjs.org/) - JavaScript library for building user interfaces;
 * [MetaMask](https://metamask.io/) - serves as a digital wallet and gateway to the decentralized web;
 * [Ethers](https://docs.ethers.org/v5/) - for interaction with accounts in the blockchain;
 * [Pinata](https://www.pinata.cloud/) - for upload content to IPFS with dev tools and fetch it at blazing speeds with Dedicated Gateways;
 * [Axios](https://axios-http.com/) - for simple HTTP client interaction based on promises for browser and node.js.

#### Backend:
 * [Express](https://expressjs.com/) - minimalistic and flexible web framework for Node.js applications;
 * [MongoDB](https://www.mongodb.com/) - for cloud database and data services;
 * [CORS](https://expressjs.com/en/resources/middleware/cors.html) - for providing a Connect/Express middleware that can be used to enable CORS with various options.

#### Blockchain:
 * [Hardhat](https://hardhat.org/) - development environment for Ethereum software;
 * [OpenZeppelin](https://www.openzeppelin.com/) - for provide security products for smart contracts.


### Development
Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request 
