import mongoose from "mongoose";

const Watch = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  walletAddress: { type: String, required: true },
  desc: { type: String, required: true },
});

export default mongoose.model("Watch", Watch);
