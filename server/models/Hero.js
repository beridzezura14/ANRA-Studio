import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Cloudinary URL
      required: true,
    },
  },
  { timestamps: true }
);

const Hero = mongoose.model("Hero", heroSchema);

export default Hero;
