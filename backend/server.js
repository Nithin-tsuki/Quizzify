import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import { Server } from 'socket.io'; // Named import
import userRoutes from './router/userRouter.js';
import courseRoutes from './router/courseRoutes.js';
import chatRoutes from './router/chatRoutes.js';
import friendsRoutes from './router/friendsRoutes.js';
import quizRoutes from './router/quizRoutes.js';
import challengeRoutes from './router/challengeRoutes.js';
import progressRoutes from './router/progressRoutes.js';
import quizgetRoutes from './router/quizzes.js';
import Student from './models/student.js'; // Import the Student model
import QuizChallengeRoutes from './router/quizChallengeRoutes.js';
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = http.createServer(app);
dotenv.config();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });
// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://nithin:9804@cluster0.zauvqnf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.post("/generate-questions", upload.single("file"), (req, res) => {
  const { start_page, end_page, num_questions } = req.body;
  console.log("Received data:", req.body);
  const pdfPath = req.file.path;
  console.log("PDF Path:", pdfPath);
  const pythonProcess = spawn("python", [
    path.join(__dirname, "question_gen.py"),
    pdfPath,
    start_page,
    end_page,
    num_questions,
  ]);

  let result = "";

  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("Python error:", data.toString());
  });

  pythonProcess.on("close", (code) => {
    fs.unlink(pdfPath, () => {}); // Clean up uploaded PDF

    try {
      const output = JSON.parse(result);
      if (output.questions) {
        res.json({ questions: output.questions });
      } else {
        res.status(500).json({ error: output.error || "Failed to generate questions." });
      }
    } catch (err) {
      console.error("Parse error:", err);
      res.status(500).json({ error: "Invalid response from Python script." });
    }
  });
});



// Routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/chat", chatRoutes);
app.use("/friends", friendsRoutes);
app.use("/quiz", quizRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/progress', progressRoutes);
app.use('/quizchallenges', QuizChallengeRoutes);
app.use('/quizzes', quizgetRoutes);
app.get('/', (req, res) => {
  res.send('Hello World with MongoDB connected!');
});
let leaderboard = [];

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  // Room join for chat
  socket.on("joinRoom", ({ sender, receiver }) => {
    const roomId = getRoomId(sender, receiver);
    socket.join(roomId);
    console.log(`👥 ${sender} joined room: ${roomId}`);
  });

  // Message handling
  socket.on("sendMessage", (messageData) => {
    const roomId = getRoomId(messageData.senderId, messageData.receiverId);
    io.to(roomId).emit("newMessage", messageData);
    console.log("📤 Broadcasted message to room:", roomId);
  });

  // 🧠 Handle quiz submission
  

  // Multer config for PDF uploads


  socket.on('submit_score', async ({ name, score }) => {
    try {
      const student = await Student.findOne({ username: name });
      if (student) {
        student.points += score;
        await student.save();

        // Update leaderboard in memory or from DB again
        leaderboard = await Student.find({ points: { $gt: 0 } })
          .sort({ points: -1 })
          .limit(10)
          .select('username points -_id');

        io.emit('update_leaderboard', leaderboard);
      }
    } catch (err) {
      console.error('Error updating score:', err);
    }
  });
  socket.on("update_score_live", ({ name, score }) => {
    // Find if user already exists in in-memory leaderboard
    const existing = leaderboard.find((entry) => entry.username === name);
  
    if (existing) {
      existing.points = score;
    } else {
      leaderboard.push({ username: name, points: score });
    }
  
    // Sort and limit leaderboard to top 10
    leaderboard.sort((a, b) => b.points - a.points);
    leaderboard = leaderboard.slice(0, 10);
  
    io.emit("update_leaderboard", leaderboard);
  });

  socket.emit('update_leaderboard', leaderboard);

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
  });
});

// Room ID utility
function getRoomId(user1, user2) {
  return [user1, user2].sort().join("_");
}

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
