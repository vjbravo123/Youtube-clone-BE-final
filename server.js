import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import likesRoutes from "./routes/LikeRoutes.js"
import { notFound, errorHandler } from "./middleware/error.js";

dotenv.config();
const app = express();
await connectDB();

app.use(cors({origin: "*", credentials: true}));
app.use(express.json());


app.get("/", (req, res) => res.send("You reached the server finally"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likesRoutes);


// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
