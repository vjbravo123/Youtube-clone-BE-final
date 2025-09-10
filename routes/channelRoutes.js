import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createChannel, getChannel, getChannelByUser } from "../controllers/channelController.js";

const router = express.Router();

router.get("/user/:userId", getChannelByUser);
router.get("/:id", getChannel);
router.post("/", protect, createChannel);
router.get("/:idOrHandle", getChannel);

export default router;
