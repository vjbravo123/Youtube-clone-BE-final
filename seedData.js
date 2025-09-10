import mongoose from "mongoose";
import dotenv from "dotenv";
import Channel from "./models/Channel.js";
import Video from "./models/Video.js";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");

    await Channel.deleteMany();
    await Video.deleteMany();

    // Channels
    const channelsData = [
      { name: "Code Academy", handle: "codeacademy", description: "Learn coding with tutorials" },
      { name: "React School", handle: "reactschool", description: "Master React step by step" },
      { name: "FullStack Dev", handle: "fullstackdev", description: "MERN projects & tutorials" },
      { name: "Node Masters", handle: "nodemasters", description: "Node.js backend tutorials" },
      { name: "JS Insights", handle: "jsinsights", description: "JavaScript deep dives" },
      { name: "Frontend Fun", handle: "frontendfun", description: "UI/UX & Frontend tips" },
    ];

    const channels = await Channel.insertMany(channelsData);

    // Video data
    const videos = [
      // React
      {
        title: "React JS Crash Course",
        videoUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
        videoId: "w7ejDZ8SWv8",
        thumbnailUrl: "https://i.ytimg.com/vi/w7ejDZ8SWv8/hqdefault.jpg",
        views: 120000,
        category: "React",
        uploader: null,
        channel: channels[1]._id,
        likes: 4500,
        comments: [],
      },
      {
        title: "React Hooks Tutorial",
        videoUrl: "https://www.youtube.com/watch?v=f687hBjwFcM",
        videoId: "f687hBjwFcM",
        thumbnailUrl: "https://i.ytimg.com/vi/f687hBjwFcM/hqdefault.jpg",
        views: 85000,
        category: "React",
        uploader: null,
        channel: channels[1]._id,
        likes: 3200,
        comments: [],
      },
      // Tailwind
      {
        title: "Tailwind CSS Crash Course",
        videoUrl: "https://www.youtube.com/watch?v=dFgzHOX84xQ",
        videoId: "dFgzHOX84xQ",
        thumbnailUrl: "https://i.ytimg.com/vi/dFgzHOX84xQ/hqdefault.jpg",
        views: 76000,
        category: "Tailwind",
        uploader: null,
        channel: channels[5]._id,
        likes: 2100,
        comments: [],
      },
      {
        title: "Tailwind Components Tutorial",
        videoUrl: "https://www.youtube.com/watch?v=UBOj6rqRUME",
        videoId: "UBOj6rqRUME",
        thumbnailUrl: "https://i.ytimg.com/vi/UBOj6rqRUME/hqdefault.jpg",
        views: 54000,
        category: "Tailwind",
        uploader: null,
        channel: channels[5]._id,
        likes: 1800,
        comments: [],
      },
      // MERN
      {
        title: "MERN Stack Full Course",
        videoUrl: "https://www.youtube.com/watch?v=7CqJlxBYj-M",
        videoId: "7CqJlxBYj-M",
        thumbnailUrl: "https://i.ytimg.com/vi/7CqJlxBYj-M/hqdefault.jpg",
        views: 95000,
        category: "MERN",
        uploader: null,
        channel: channels[2]._id,
        likes: 4000,
        comments: [],
      },
      {
        title: "Build a MERN App",
        videoUrl: "https://www.youtube.com/watch?v=ngc9gnGgUdA",
        videoId: "ngc9gnGgUdA",
        thumbnailUrl: "https://i.ytimg.com/vi/ngc9gnGgUdA/hqdefault.jpg",
        views: 87000,
        category: "MERN",
        uploader: null,
        channel: channels[2]._id,
        likes: 3500,
        comments: [],
      },
      // JavaScript
      {
        title: "JavaScript Basics Tutorial",
        videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        videoId: "W6NZfCO5SIk",
        thumbnailUrl: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg",
        views: 130000,
        category: "JavaScript",
        uploader: null,
        channel: channels[4]._id,
        likes: 5000,
        comments: [],
      },
      {
        title: "Async JS Crash Course",
        videoUrl: "https://www.youtube.com/watch?v=PoRJizFvM7s",
        videoId: "PoRJizFvM7s",
        thumbnailUrl: "https://i.ytimg.com/vi/PoRJizFvM7s/hqdefault.jpg",
        views: 95000,
        category: "JavaScript",
        uploader: null,
        channel: channels[4]._id,
        likes: 4200,
        comments: [],
      },
      // Node.js
      {
        title: "Node.js Crash Course",
        videoUrl: "https://www.youtube.com/watch?v=fBNz5xF-Kx4",
        videoId: "fBNz5xF-Kx4",
        thumbnailUrl: "https://i.ytimg.com/vi/fBNz5xF-Kx4/hqdefault.jpg",
        views: 110000,
        category: "Node.js",
        uploader: null,
        channel: channels[3]._id,
        likes: 4700,
        comments: [],
      },
      {
        title: "Express.js Tutorial",
        videoUrl: "https://www.youtube.com/watch?v=L72fhGm1tfE",
        videoId: "L72fhGm1tfE",
        thumbnailUrl: "https://i.ytimg.com/vi/L72fhGm1tfE/hqdefault.jpg",
        views: 80000,
        category: "Node.js",
        uploader: null,
        channel: channels[3]._id,
        likes: 3300,
        comments: [],
      },
      // MongoDB
      {
        title: "MongoDB Crash Course",
        videoUrl: "https://www.youtube.com/watch?v=-56x56UppqQ",
        videoId: "-56x56UppqQ",
        thumbnailUrl: "https://i.ytimg.com/vi/-56x56UppqQ/hqdefault.jpg",
        views: 90000,
        category: "MongoDB",
        uploader: null,
        channel: channels[2]._id,
        likes: 3800,
        comments: [],
      },
      {
        title: "MongoDB Aggregation Tutorial",
        videoUrl: "https://www.youtube.com/watch?v=3MDNqAvZBv0",
        videoId: "3MDNqAvZBv0",
        thumbnailUrl: "https://i.ytimg.com/vi/3MDNqAvZBv0/hqdefault.jpg",
        views: 60000,
        category: "MongoDB",
        uploader: null,
        channel: channels[2]._id,
        likes: 2700,
        comments: [],
      },
      // Music
      {
        title: "Top Hits 2023",
        videoUrl: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
        videoId: "JGwWNGJdvx8",
        thumbnailUrl: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg",
        views: 2000000,
        category: "Music",
        uploader: null,
        channel: channels[4]._id,
        likes: 150000,
        comments: [],
      },
      // Gaming
      {
        title: "Minecraft Let's Play",
        videoUrl: "https://www.youtube.com/watch?v=MmB9b5njVbA",
        videoId: "MmB9b5njVbA",
        thumbnailUrl: "https://i.ytimg.com/vi/MmB9b5njVbA/hqdefault.jpg",
        views: 350000,
        category: "Gaming",
        uploader: null,
        channel: channels[5]._id,
        likes: 27000,
        comments: [],
      },
      // Add more videos similarly until you reach 30+
    ];

    await Video.insertMany(videos);
    console.log("✅ Seed data inserted successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
