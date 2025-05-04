// import User from '../models/registration.js';
// import bcrypt from 'bcrypt';

// const createUser = async (req, res) => {
//   try {
//     const { role, fullName, username, password, email } = req.body;

//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username or email already exists.' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       role,
//       fullName,
//       username,
//       password: hashedPassword,
//       email
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully.' });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// };

// export  {createUser,loginUser};

import Student from '../models/student.js';
import bcrypt from 'bcrypt';
import createToken from "../utils/createToken.js";
import teacher from '../models/teacher.js';
const createUser = async (req, res) => {
  try {
    const { role, fullName, username, password, email } = req.body;
    console.log(req.body);

    if (role !== "student" && role !== "teacher") {
      return res.status(400).json({ message: "Invalid role provided." });
    }

    const Model = role === "student" ? Student : teacher;

    const existingUser = await Model.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      role,
      fullName,
      username,
      password: hashedPassword,
      email,
    };
    if (role === "student") {
      const userCount = await Student.countDocuments();
      const generatedId = `STU${(userCount + 1).toString().padStart(3, '0')}`;
      newUserData.studentId = generatedId;
    } else if (role === "teacher") {
      const teacherCount = await teacher.countDocuments();
      const generatedId = `TEA${(teacherCount + 1).toString().padStart(3, '0')}`;
      newUserData.teacherId = generatedId;
    }
    

    const newUser = new Model(newUserData);

    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log(req.body);

    let user;

    if (role === "student") {
      user = await Student.findOne({ username });
    } else if (role === "teacher") {
      user = await teacher.findOne({ username });
    } else {
      return res.status(400).json({ message: "Invalid role provided." });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    createToken(res, user._id);

    res.status(200).json({
      userid: user._id,
      username: user.username,
      role: user.role,
      fullName: user.fullName
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const logoutUser = async(req,res)=>{
  res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0),
  });
  res.status(200).send("User Logged Out");
};
export { createUser, loginUser,logoutUser};
