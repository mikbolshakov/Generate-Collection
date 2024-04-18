import express from "express";
import mongoose from "mongoose";
import NFT from "./schema.js";
import Admin from "./schemaAdmin.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = 3500;
const DB_URL = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.nt7f3aa.mongodb.net/`;

const app = express();

app.use(cors());
app.use(express.json());

app.post("/admins", async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const newAdmin = new Admin({
      walletAddress,
    });
    const user = await newAdmin.save();
    res.json({ ...user._doc });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding admin to database",
    });
  }
});

app.get("/getAdmins", async (req, res) => {
  try {
    const { walletAddress } = req.query;
    const admin = await Admin.findOne({ walletAddress });
    if (admin) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error checking wallet",
    });
  }
});

app.get("/all", async (req, res) => {
  try {
    const nfts = await NFT.find({});
    res.json(nfts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error to get list of NFTs from database",
    });
  }
});

app.post("/nfts", async (req, res) => {
  try {
    const { id, walletAddress, desc } = req.body;
    const newNFT = new NFT({
      id,
      walletAddress,
      desc,
    });
    const user = await newNFT.save();
    res.json({ ...user._doc });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding the nft to database",
    });
  }
});

app.get("/nfts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const nft = await NFT.findOne({ id });

    if (!nft) {
      return res.status(404).json({
        message: "NFT not found in database",
      });
    }

    res.json({
      walletAddress: nft.walletAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching walletAddress from database",
    });
  }
});

app.put("/nfts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { walletAddress } = req.body;
    const updatedNFT = await NFT.findOneAndUpdate(
      { id },
      { $set: { walletAddress } }
    );

    if (!updatedNFT) {
      return res.status(404).json({
        message: "NFT not found in database",
      });
    }

    res.json(updatedNFT);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating nft data in database",
    });
  }
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () =>
      console.log("The server is running on a port " + PORT)
    );
  } catch (error) {
    console.log(error);
  }
}

startApp();
