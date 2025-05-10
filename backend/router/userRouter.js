import express from "express";
import {createUser,loginUser,logoutUser} from "../controllers/users.js";
const router=express.Router();
import Student from "../models/student.js";
// router.route('/').post(createUser);
router.post('/',createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
// routes/user.js

router.get('/leaderboard', async (req, res) => {
  try {
    const students = await User.find().sort({ points: -1 }).select('fullName username email points');
    res.json(students);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get("/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await Student.findOne({ userid });
    // console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// GET /users/:username - Fetch user by username
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await Student.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;