import express from "express";
import Video from "../models/Video.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Like video
router.put("/:id/like", protect, async (req, res) => {
  const video = await Video.findById(req.params.id);
  const userId = req.user.id; // assuming authMiddleware adds user

  if (!video) return res.status(404).json({ message: "Video not found" });

  // Check if user already liked
  if (video.likedBy.includes(userId)) {
    // Remove like
    video.likes--;
    video.likedBy.pull(userId);
    video.userReaction = null;
  } else {
    // Add like
    video.likes++;
    video.likedBy.push(userId);

    // Remove dislike if exists
    if (video.dislikedBy.includes(userId)) {
      video.dislikes--;
      video.dislikedBy.pull(userId);
    }

    video.userReaction = "like";
  }

  await video.save();
  res.json({ likes: video.likes, dislikes: video.dislikes, userReaction: video.userReaction });
});

// Dislike video
router.put("/:id/dislike", protect, async (req, res) => {
  const video = await Video.findById(req.params.id);
  const userId = req.user.id;

  if (!video) return res.status(404).json({ message: "Video not found" });

  if (video.dislikedBy.includes(userId)) {
    // Remove dislike
    video.dislikes--;
    video.dislikedBy.pull(userId);
    video.userReaction = null;
  } else {
    // Add dislike
    video.dislikes++;
    video.dislikedBy.push(userId);

    // Remove like if exists
    if (video.likedBy.includes(userId)) {
      video.likes--;
      video.likedBy.pull(userId);
    }

    video.userReaction = "dislike";
  }

  await video.save();
  res.json({ likes: video.likes, dislikes: video.dislikes, userReaction: video.userReaction });
});

export default router;
