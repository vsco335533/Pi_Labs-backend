import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    url: String,
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    uploadedBy: String, // user id from Postgres
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);
