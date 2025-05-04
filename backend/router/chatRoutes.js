import express from "express";
import {
  sendMessage,
  getMessages,
  getSentUsers,
  getSuggestions,
  addFriend,
  getFriends,
  deleteMessage
} from "../controllers/chatController.js";

import Message from "../models/Message.js";
import Student from "../models/student.js";
import mongoose from "mongoose";

const router = express.Router();

// Fetch messages for a user by their name (resolve name to ID first)
router.get("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch user _id from username
    const user = await Student.findOne({ name: username }).select("_id");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user._id.toString(); // Convert to string for comparison

    // Find messages where the user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    });

    // Extract unique user IDs from messages
    const userIds = new Set();
    messages.forEach((msg) => {
      if (msg.senderId.toString() !== userId) userIds.add(msg.senderId.toString());
      if (msg.receiverId.toString() !== userId) userIds.add(msg.receiverId.toString());
    });

    // Fetch usernames for the extracted IDs
    const users = await Student.find({ _id: { $in: Array.from(userIds) } }).select("name");
    const usernames = users.map(user => user.name);

    res.json(usernames);
  } catch (error) {
    console.error("Error fetching message users:", error);
    res.status(500).json({ message: "Server error while fetching message users" });
  }
});

router.get("/sent/:sender", getSentUsers);
router.get("/:sender/:receiver", getMessages);
router.post("/send", sendMessage);
router.get("/suggestions/:currentUserId", getSuggestions);
router.post("/add", addFriend);
router.get("friends/:currentUser", getFriends);
router.get("friends/:currentUser", getFriends);
router.delete("/messages/:messageId", deleteMessage);

router.get("/messages/received/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`User ID from request: ${userId}`);
    // Find all messages where the user is the receiver
    const receivedMessages = await Message.find({ receiverId: userId });

    res.status(200).json(receivedMessages);
  } catch (error) {
    console.error("Error fetching received messages:", error);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
