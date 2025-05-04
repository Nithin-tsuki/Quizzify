import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io'; // Named import
import userRoutes from './router/userRouter.js';
import courseRoutes from './router/courseRoutes.js';
import chatRoutes from './router/chatRoutes.js';
import friendsRoutes from './router/friendsRoutes.js';
import quizRoutes from './router/quizRoutes.js';
import challengeRoutes from './router/challengeRoutes.js';
import progressRoutes from './router/progressRoutes.js';


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://nithin:9804@cluster0.zauvqnf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/chat", chatRoutes);
app.use("/friends", friendsRoutes);
app.use("/quiz", quizRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/progress', progressRoutes);


app.get('/', (req, res) => {
  res.send('Hello World with MongoDB connected!');
});

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  socket.on("joinRoom", ({ sender, receiver }) => {
    const roomId = getRoomId(sender, receiver);
    socket.join(roomId);
    console.log(`👥 ${sender} joined room: ${roomId}`);
  });

  socket.on("sendMessage", (messageData) => {
    const roomId = getRoomId(messageData.senderUsername, messageData.receiverUsername);
    io.to(roomId).emit("newMessage", messageData);
    console.log("📤 Broadcasted message to room:", roomId);
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
  });
});

// Utility to create consistent room ID
function getRoomId(user1, user2) {
  return [user1, user2].sort().join("_");
}

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
