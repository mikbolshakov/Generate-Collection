import express from "express";
import mongoose from "mongoose";
import Watch from "./schema.js";
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
    const watches = await Watch.find({});
    res.json(watches);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error to get list of watches from database",
    });
  }
});

app.post("/watches", async (req, res) => {
  try {
    const { id, walletAddress, desc } = req.body;
    const newWatch = new Watch({
      id,
      walletAddress,
      desc,
    });
    const user = await newWatch.save();
    res.json({ ...user._doc });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding the watch to database",
    });
  }
});

app.get("/watches/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const watch = await Watch.findOne({ id });

    if (!watch) {
      return res.status(404).json({
        message: "Watch not found in database",
      });
    }

    res.json({
      walletAddress: watch.walletAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching walletAddress from database",
    });
  }
});

app.put("/watches/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { walletAddress } = req.body;
    const updatedWatch = await Watch.findOneAndUpdate(
      { id },
      { $set: { walletAddress } }
    );

    if (!updatedWatch) {
      return res.status(404).json({
        message: "Watch not found in database",
      });
    }

    res.json(updatedWatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating watch data in database",
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
