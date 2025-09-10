import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    handle: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    bannerImage: { type: String, default: "" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // now optional
  },
  { timestamps: true }
);

// convenience virtual for number of videos
channelSchema.virtual("videos", {
  ref: "Video",
  localField: "_id",
  foreignField: "channel",
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
