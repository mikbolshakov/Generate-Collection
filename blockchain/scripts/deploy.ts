import { ethers } from "hardhat";
import hre from "hardhat";
import "hardhat-deploy";

// npx hardhat run scripts/deploy.ts --network chain
async function main() {
  const NFTWatches = await ethers.getContractFactory("NFTWatches");
  const nftwatches = await NFTWatches.deploy();

  await nftwatches.deployed();
  console.log(`NFT deployed to ${nftwatches.address}`);

  await new Promise((resolve) => setTimeout(resolve, 30000));

  await hre.run("verify:verify", {
    address: nftwatches.address,
    constructorArguments: [],
    contract: "contracts/NFTWatches.sol:NFTWatches",
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
