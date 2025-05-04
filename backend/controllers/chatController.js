import Message from "../models/Message.js";
import Student from "../models/student.js"; // Import Student model

// Fetch messages sent by a user
export const getSentUsers = async (req, res) => {
  try {
    const sender = req.params.sender;
    const messages = await Message.find({ sender });

    const recipients = [...new Set(messages.map((msg) => msg.receiver))];

    res.json(recipients);
  } catch (error) {
    console.error("Error fetching sent messages:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch messages between two users
export const getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    console.log(sender, receiver);
    const send = await Student.findOne({ name: sender });
    const receive = await Student.findOne({ name: receiver });

    if (!send || !receive) {
      return res.status(404).json({ error: "User not found" });
    }

    const messages = await Message.find({
      $or: [
        { senderId: send._id, receiverId: receive._id },
        { senderId: receive._id, receiverId: send._id },
      ],
    })
      .sort({ timestamp: 1 })
      .populate("senderId receiverId", "username");

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages" });
  }
};
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    console.log(messageId+" svcdc");
    // Find and delete the message
    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    console.log(senderId, receiverId, text);
    if (!senderId || !receiverId || !text) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sender = await Student.findOne({ username: senderId });
    const receiver = await Student.findOne({ username: receiverId });

    if (!sender || !receiver) {
      return res.status(404).json({ error: "User not found" });
    }

    const newMessage = new Message({
      senderId: sender._id,
      receiverId: receiver._id,
      text,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
};

// Get suggested users to connect
export const getSuggestions = async (req, res) => {
  try {
    const students = await Student.find({ _id: { $ne: req.params.currentUserId } }).select('username');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a user to friends list
export const addFriend = async (req, res) => {
  const { currentUserId, friendId } = req.body;
  try {
    const user = await Student.findById(currentUserId);
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
    }
    res.json({ message: 'Friend added successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a user's friends list
export const getFriends = async (req, res) => {
  try {
    const user = await Student.findById(req.params.userId).populate('friends', 'username');
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
