import Video from "../models/Video.js";

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()// uploader info
      .populate("channel", "name handle");          // channel info
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("channel")
      .populate({
        path: "comments",
        populate: { path: "user", select: "username" }
      });

    if (!video) return res.status(404).json({ message: "Video not found" });

    // Recommended: other videos from same channel
    const recommended = await Video.find({ channel: video.channel._id, _id: { $ne: video._id } })
      .limit(6);

    res.json({ ...video.toObject(), recommended });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const createVideo = async (req, res) => {
  const { title, description, videoUrl, thumbnailUrl, channel } = req.body;
  if (!title || !videoUrl || !thumbnailUrl || !channel)
    return res.status(400).json({ message: "title, videoUrl, thumbnailUrl, channel are required" });

  const video = await Video.create({ title, description, videoUrl, thumbnailUrl, channel });
  res.status(201).json(video);
};

export const updateVideo = async (req, res) => {
  const updated = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Video not found" });
  res.json(updated);
};

export const deleteVideo = async (req, res) => {
  const deleted = await Video.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Video not found" });
  res.json({ message: "Video deleted" });
};
