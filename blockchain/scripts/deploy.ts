import { ethers } from "hardhat";
import hre from "hardhat";
import "hardhat-deploy";

// npx hardhat run scripts/deploy.ts --network chain
async function main() {
  const adminAddress = "0x3a55811a1f200d5a418156072bcbbfb8d82b989d";
  const NFTWatches = await ethers.getContractFactory("NFTWatches");
  const nftwatches = await NFTWatches.deploy(adminAddress);

  await nftwatches.deployed();
  console.log(`NFT deployed to ${nftwatches.address}`);

  await new Promise((resolve) => setTimeout(resolve, 15000));

  await hre.run("verify:verify", {
    address: nftwatches.address,
    constructorArguments: [adminAddress],
    contract: "contracts/NFTWatches.sol:NFTWatches",
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
