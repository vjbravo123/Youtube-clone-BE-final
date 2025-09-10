import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getComments, addComment ,  updateComment,  deleteComment, } from "../controllers/commentController.js";

const router = express.Router();

// ✅ Get all comments for a video
router.get("/:videoId", getComments);

// ✅ Add a comment to a video
// router.post('/:id/comments' ,protect , addComment)
router.post('/:videoId/comments', protect, addComment);

// ✅ Update a comment
router.put("/:videoId/comments/:commentId", protect, updateComment);

// ✅ Delete a comment
router.delete("/:videoId/comments/:commentId", protect, deleteComment);


export default router;
