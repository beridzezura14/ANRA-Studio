import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String },
}, { timestamps: true });

export default mongoose.model("About", AboutSchema);
