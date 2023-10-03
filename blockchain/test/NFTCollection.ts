import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { NFTCollection } from "../typechain-types";

describe("FastCollection tests", () => {
  let nftContract: NFTCollection;
  let signers: SignerWithAddress[];
  let admin: SignerWithAddress;
  before(async () => {
    signers = await ethers.getSigners();
    admin = signers[0];
  });

  it("Deploys NFT contract", async () => {
    const Factory = await ethers.getContractFactory("NFTCollection");
    const nftCollection = await Factory.deploy();

    expect(nftCollection.address).to.not.eq(ethers.constants.AddressZero);
    nftContract = nftCollection as NFTCollection;
  });

  it("Checks mint function", async () => {
    for (let i = 0; i < 200; i++) {
      let mintTx = await nftContract.safeMint(admin.address, "uri");
      await mintTx.wait();
    }
    expect(await nftContract.balanceOf(admin.address)).to.be.eq(200);
  });
});
