import mongoose from "mongoose";
import Student from "../models/student.js";

// Get friends list
export const getFriends = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`User ID from request: ${userId}`);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await Student.findById(userId).populate("friends");
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User found:", user.username);
    res.json(user.friends);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Unfollow a friend
export const unfollowFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    console.log(`Looking for user with ID: ${userId}`);
    const user = await Student.findById(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User found:", user.username);

    user.friends = user.friends.filter(id => id.toString() !== friendId);
    await user.save();

    console.log(`User ${userId} unfollowed friend ${friendId}`);
    res.json({ message: "Unfollowed successfully" });
  } catch (error) {
    console.error("Error unfollowing friend:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add friend
export const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    if (!userId || !friendId) {
      return res.status(400).json({ message: "Both userId and friendId are required." });
    }

    const user = await Student.findById(userId);
    const friend = await Student.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.role) user.role = "student";
    if (!friend.role) friend.role = "student";

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Already friends." });
    }

    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    return res.status(200).json({ message: "Friend added successfully!", friends: user.friends });
  } catch (error) {
    console.error("Error adding friend:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get available students (not current user or their friends)
export const getAvailableStudents = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`User ID from request: ${userId}`);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID." });
    }

    const user = await Student.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const excludeIds = [...user.friends, user._id];

    const availableStudents = await Student.find({
      _id: { $nin: excludeIds }
    }).select("_id username fullName email");

    return res.status(200).json(availableStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
