import User from "../models/User.js";
import Video from "../models/Video.js";

// ✅ Get all comments for a video
export const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId).populate("comments.user", "_id username");
    if (!video) return res.status(404).json({ message: "Video not found" });

    res.json(video.comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { videoId } = req.params;   // ✅ match route
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: "Comment text is required" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // ✅ Push new comment into video.comments array
    const newComment = {
      text,
      user: user._id,
      username: user.username ,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    video.comments.push(newComment);
    await video.save();

    // ✅ Get the last added comment
    const addedComment = video.comments[video.comments.length - 1];

    // ✅ Manually populate user details
    const populatedComment = {
      _id: addedComment._id,
      text: addedComment.text,
      createdAt: addedComment.createdAt,
      updatedAt: addedComment.updatedAt,
      user: {
        _id: user._id,
        username: user.username,
      },
    };

    res.status(201).json(populatedComment);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Update comment
export const updateComment = async (req, res) => {
  try {
    const { videoId, commentId } = req.params;
    const { text } = req.body;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const comment = video.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only edit your own comment" });
    }

    comment.text = text || comment.text;
    comment.updatedAt = new Date();

    await video.save();

    // ✅ populate via parent doc
    await video.populate("comments.user", "_id username");

    // ✅ find the updated comment again (now populated)
    const updatedComment = video.comments.id(commentId);

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete comment
export const deleteComment = async (req, res) => {
  try {
    const { videoId, commentId } = req.params;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const comment = video.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own comment" });
    }

    comment.deleteOne();
    await video.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: error.message });
  }
};
