import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoId: { type: String, required: true }, // YouTube video ID
    videoUrl: { type: String },
    thumbnailUrl: { type: String },
    description: { type: String, default: "" },
    views: { type: Number, default: 0 },
    category: { type: String, default: "General" },
    uploader: { type: String, default: null },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },

    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },

    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],     // Users who liked
    dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  // Users who disliked

    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    recommended: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
