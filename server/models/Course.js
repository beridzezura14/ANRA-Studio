import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true }, // YouTube ბმული
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    image: { type: String, required: true }, // Cloudinary-ის ლინკი
    title: { type: String, required: true },
    topics: [topicSchema],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
