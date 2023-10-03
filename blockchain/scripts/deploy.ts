import { ethers } from "hardhat";
import hre from "hardhat";
import "hardhat-deploy";

// npx hardhat run scripts/deploy.ts --network chain
async function main() {
  const adminAddress = "0x2c84C3D16AaAC1157919D9210CBC7b8797F5A91a";
  const NFTCollection = await ethers.getContractFactory("NFTCollection");
  const nftCollection = await NFTCollection.deploy(adminAddress);

  await nftCollection.deployed();
  console.log(`NFT deployed to ${nftCollection.address}`);

  await new Promise((resolve) => setTimeout(resolve, 15000));

  await hre.run("verify:verify", {
    address: nftCollection.address,
    constructorArguments: [adminAddress],
    contract: "contracts/NFTCollection.sol:NFTCollection",
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
