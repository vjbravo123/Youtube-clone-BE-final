# 📺 YouTube Backend Server

This is the backend server for a YouTube-like application. It powers user authentication, video uploads/streaming, comments, likes, subscriptions, and recommendations.  

The backend is built with **Node.js + Express** and uses **MongoDB** for storage. Authentication is handled with **JWT**, and video files are stored in **cloud storage (e.g., AWS S3 / GCP / local storage)**.  

---

## 🚀 Features

- 🔐 **Authentication & Authorization** (JWT-based login & signup)  
- 📤 **Video Upload & Streaming** (with chunked upload support)  
- 📺 **Video Playback API**  
- 👍 **Likes / Dislikes**  
- 💬 **Comments & Replies**  
- 📜 **Subscriptions & Channels**  
- 🔍 **Search & Recommendations**  
- 📈 **Analytics (views, watch time, trending videos)**  

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)  
- **Framework**: Express.js  
- **Database**: MongoDB (Mongoose ODM)  
- **Authentication**: JSON Web Tokens (JWT)  
- **Storage**: Local / AWS S3 / Cloudinary (configurable)  
- **Streaming**: Range-based HTTP Partial Content (206)  

---

## 📂 Project Structure

```
backend/
│── src/
│   ├── config/        # Environment & DB config
│   ├── controllers/   # Route controllers
│   ├── middlewares/   # Authentication, error handling
│   ├── models/        # MongoDB schemas
│   ├── routes/        # Express routes
│   ├── services/      # Business logic
│   └── utils/         # Helpers & utilities
│── uploads/           # (if storing locally)
│── .env.example       # Example env variables
│── server.js          # App entry point
│── package.json
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/youtube-backend.git
cd youtube-backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/youtube
JWT_SECRET=your_jwt_secret
CLOUD_STORAGE=local   # or s3, gcp, cloudinary
```

### 4️⃣ Run the Server
```bash
npm run dev   # with nodemon
npm start     # production mode
```

Server will run at: **http://localhost:5000**  

---

## 📡 API Endpoints (Sample)

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| POST   | `/api/auth/signup`   | Register a new user          |
| POST   | `/api/auth/login`    | Login & get JWT              |
| GET    | `/api/videos`        | Fetch all videos             |
| POST   | `/api/videos/upload` | Upload a new video           |
| GET    | `/api/videos/:id`    | Stream a video by ID         |
| POST   | `/api/videos/:id/like` | Like a video               |
| POST   | `/api/videos/:id/dislike` | Dislike a video         |
| POST   | `/api/comments/:id`  | Add a comment to a video     |

---

## 🧪 Testing

```bash
npm run test
```

---

## 🤝 Contributing

1. Fork the project  
2. Create a new branch (`git checkout -b feature/your-feature`)  
3. Commit changes (`git commit -m 'Add new feature'`)  
4. Push to branch (`git push origin feature/your-feature`)  
5. Create a Pull Request  

---

## 📜 License

This project is licensed under the MIT License.
