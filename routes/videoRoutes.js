import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getVideos, getVideo, createVideo, updateVideo, deleteVideo } from "../controllers/videoController.js";


const router = express.Router();

router.get("/", getVideos);
router.get("/:id", getVideo);
router.post("/", protect, createVideo);
router.put("/:id", protect, updateVideo);
router.delete("/:id", protect, deleteVideo);

export default router;
