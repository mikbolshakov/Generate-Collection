import mongoose from "mongoose";

const Admin = new mongoose.Schema({
  walletAddress: { type: String, required: true },
});

export default mongoose.model("Admin", Admin);
